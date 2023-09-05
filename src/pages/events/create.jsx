import EventForm from "@/components/EventForm";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateEvent = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [dateType, setDateType] = useState("full_date");
  const [place, setPlace] = useState("");
  const [officialUrl, setOfficialUrl] = useState("");
  const [error, setError] = useState(null);
  const [selectedOption, setSelectedOption] = useState("日付");
  const [selectedTimeOption, setSelectedTimeOption] = useState("時間がわかる場合");

  const options = { full_date: "日付", month_only: "月のみ" };
  const timeOptions = { time: "時間がわかる場合", unknown: "不明の場合" };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
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
    // データの内容を確認したい場合 console.log(...data.entries());
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axiosInstance.post("/events", data, config);
      router.push("/events");
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
        type="create"
      />
    </div>
  );
};

export default CreateEvent;
