import EventForm from "@/components/EventForm";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events/${params.id}`);
  const event = await res.json();

  if (event.status) {
    return {
      notFound: true,
    };
  }

  return { props: { event } };
}

const EditEvent = ({ event }) => {
  console.log(event);
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState(event.title);
  const [body, setBody] = useState(event.body);
  const [startDate, setStartDate] = useState(event.start_date);
  const [endDate, setEndDate] = useState(event.end_date);
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateType, setDateType] = useState(event.date_type);
  const [place, setPlace] = useState(event.place);
  const [officialUrl, setOfficialUrl] = useState(event.official_url);
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("日付");
  const [selectedTimeOption, setSelectedTimeOption] = useState("");
  const [loading, setLoading] = useState(true);

  const options = { full_date: "日付", month_only: "月のみ" };
  const timeOptions = { time: "時間がわかる場合", unknown: "不明の場合" };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser.uid != event.user.uid) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (event.date_type === "full_date") {
      setSelectedOption("日付");
    } else {
      setSelectedOption("月のみ");
    }
  }, []);

  useEffect(() => {
    if (event.start_time && event.end_time) {
      setStartTime(event.start_time.split("T")[1].substr(0, 5));
      setEndTime(event.end_time.split("T")[1].substr(0, 5));
      setSelectedTimeOption("時間がわかる場合");
    } else {
      setSelectedTimeOption("不明の場合");
    }
  }, []);

  // FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData();

    formData.append("title", title);
    formData.append("body", body);
    formData.append("start_date", startDate);
    formData.append("end_date", endDate);
    formData.append("date_type", dateType);
    formData.append("start_time", startTime);
    formData.append("end_time", endTime);
    formData.append("place", place);
    formData.append("official_url", officialUrl);

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = createFormData();
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axiosInstance.put(`/events/${event.id}`, data, config);
      router.push(`/events/${event.id}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    const targetValue = e.target.value;
    const targetKey = Object.keys(options).find((key) => options[key] === targetValue);
    setDateType(targetKey);
  };

  const handleTimeOptionChange = (e) => {
    setSelectedTimeOption(e.target.value);
  };

  return (
    <>
      {loading ? (
        <>Loading ...</>
      ) : (
        <div className="mx-auto w-[1000px]">
          <h1>イベント作成画面</h1>
          {error ? (
            <div className="mb-2 border border-red-300">
              {/* エラーデータが配列ではなくオブジェクト型なの書き方が普段と異なる */}
              {Object.values(error).map((_error, index) => {
                return (
                  <div key={index}>
                    <h2>{_error}</h2>
                  </div>
                );
              })}
            </div>
          ) : null}

          <EventForm
            handleSubmit={handleSubmit}
            title={title}
            setTitle={setTitle}
            options={options}
            selectedOption={selectedOption}
            handleOptionChange={handleOptionChange}
            startDate={startDate}
            setStartDate={setStartDate}
            endDate={endDate}
            setEndDate={setEndDate}
            timeOptions={timeOptions}
            selectedTimeOption={selectedTimeOption}
            handleTimeOptionChange={handleTimeOptionChange}
            startTime={startTime}
            setStartTime={setStartTime}
            endTime={endTime}
            setEndTime={setEndTime}
            place={place}
            setPlace={setPlace}
            officialUrl={officialUrl}
            setOfficialUrl={setOfficialUrl}
            body={body}
            setBody={setBody}
            type="edit"
          />
        </div>
      )}
    </>
  );
};

export default EditEvent;
