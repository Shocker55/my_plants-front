import React from "react";
import CreateMap from "./CreateMap";

export default function EventForm({
  handleSubmit,
  title,
  setTitle,
  options,
  selectedOption,
  handleOptionChange,
  startDate,
  setStartDate,
  endDate,
  setEndDate,
  timeOptions,
  selectedTimeOption,
  handleTimeOptionChange,
  startTime,
  setStartTime,
  endTime,
  setEndTime,
  place,
  setPlace,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
  officialUrl,
  setOfficialUrl,
  body,
  setBody,
  type,
}) {
  return (
    <form onSubmit={handleSubmit}>
      <label>
        <h2 className="mb-2">イベント名</h2>
        <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full border" />
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
                className="ml-2 mr-2 w-[150px] border"
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
        <div className="flex justify-between">
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
        <h2>公式URL:</h2>
        <input
          value={officialUrl}
          onChange={(e) => setOfficialUrl(e.target.value)}
          className="mb-1 w-full border"
        />
      </label>
      <label>
        <h2>詳細情報:</h2>
        <div>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            className="h-[300px] w-full border"
          />
        </div>
      </label>
      <label>
        <h2>場所:</h2>
        {/* <input value={place} onChange={(e) => setPlace(e.target.value)} className="w-full border" /> */}
        <CreateMap
          place={place}
          setPlace={setPlace}
          latitude={latitude}
          setLatitude={setLatitude}
          longitude={longitude}
          setLongitude={setLongitude}
        />
      </label>
      <div className="my-5 flex justify-end">
        <div>
          {type === "create" ? (
            <button type="submit" value="Submit" className="rounded-lg border bg-blue-300 px-2">
              イベントを作成する
            </button>
          ) : (
            <button type="submit" value="Submit" className="rounded-lg border bg-blue-300 px-2">
              イベントを編集する
            </button>
          )}
        </div>
      </div>
    </form>
  );
}
