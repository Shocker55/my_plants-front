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

  const options = { full_date: "日付", month_only: "月のみ" };
  const timeOptions = { time: "時間がわかる場合", unknown: "不明の場合" };

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
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/events" className="font-medium text-blue-600 hover:underline">
          イベント一覧画面
        </Link>
      </div>

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

      <form onSubmit={handleSubmit} className="space-y-2">
        <label>
          <h2>イベント名</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[500px] border"
          />
        </label>
        <p>日程:</p>
        <div>
          {Object.values(options).map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                checked={selectedOption === option}
                onChange={handleOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
        <div className="flex">
          {selectedOption === "日付" ? (
            <>
              <label className="flex">
                <h2>開始日:</h2>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="ml-2 w-[150px] border"
                />
              </label>
              <label className="flex">
                <h2>終了日:</h2>
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="ml-2 w-[150px] border"
                />
              </label>
            </>
          ) : null}
          {selectedOption === "月のみ" ? (
            <>
              <label className="flex">
                <h2>開始日:</h2>
                <input
                  type="month"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  className="ml-2 w-[130px] border"
                />
              </label>
              <label className="flex">
                <h2>終了日:</h2>
                <input
                  type="month"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  className="ml-2 w-[130px] border"
                />
              </label>
            </>
          ) : null}
        </div>
        <div>
          {Object.values(timeOptions).map((option) => (
            <label key={option}>
              <input
                type="radio"
                value={option}
                checked={selectedTimeOption === option}
                onChange={handleTimeOptionChange}
              />
              {option}
            </label>
          ))}
        </div>
        {selectedTimeOption === "時間がわかる場合" ? (
          <div className="flex">
            <label className="flex">
              <h2>開始時間:</h2>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="ml-2 w-[150px] border"
              />
            </label>
            <label className="flex">
              <h2>終了時間:</h2>
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="ml-2 w-[150px] border"
              />
            </label>
          </div>
        ) : null}
        <label>
          <h2>場所:</h2>
          <input
            value={place}
            onChange={(e) => setPlace(e.target.value)}
            className="w-[500px] border"
          />
        </label>
        <label>
          <h2>公式URL:</h2>
          <input
            value={officialUrl}
            onChange={(e) => setOfficialUrl(e.target.value)}
            className="w-[500px] border"
          />
        </label>
        <label>
          <h2>詳細情報:</h2>
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="h-[300px] w-[500px] border"
            />
          </div>
        </label>
        <div className="my-5 flex">
          <div>
            <button type="submit" value="Submit" className="rounded-lg border bg-blue-300 px-2">
              イベントを作成する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateEvent;
