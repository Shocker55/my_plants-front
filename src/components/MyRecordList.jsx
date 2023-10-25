import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { axiosInstance } from "@/utils/axios";
import EventCard from "./EventCard";

export default function MyRecordList({ recordsItems, setRecordsItems, user, userAttendEvents }) {
  const [currentRecordsItems, setCurrentRecordsItems] = useState([...recordsItems]);
  const [currentEventsItems, setCurrentEventsItems] = useState([...userAttendEvents]);
  const [active, setActive] = useState("1");

  useEffect(() => {
    setCurrentRecordsItems(recordsItems);
  }, [recordsItems]);

  const handleClick = async (e) => {
    setActive(e.target.id);
    setCurrentRecordsItems(recordsItems);
  };

  const handleClickLikes = async (e) => {
    setActive(e.target.id);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${user.uid}/likes`
      );
      const currentLikeRecords = await res.data;
      setCurrentRecordsItems(currentLikeRecords);
    } catch (err) {
      alert("いいねした記録の取得に失敗しました");
    }
  };

  const handleClickAttendEvents = async (e) => {
    setActive(e.target.id);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${user.uid}/attend`
      );
      const attendEvents = await res.data;
      setCurrentEventsItems(attendEvents);
    } catch (err) {
      alert("参加予定のイベントの取得に失敗しました");
    }
  };

  return (
    <>
      <div className="mb-3 ml-1 font-bold">記録一覧</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClick(e)}
        >
          投稿
        </div>
        <div
          id="2"
          className={active == "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickLikes(e)}
        >
          いいね
        </div>
        <div
          id="3"
          className={active == "3" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickAttendEvents(e)}
        >
          参加予定のイベント
        </div>
      </div>
      <div className="mb-20 grid grid-cols-1 place-items-center gap-1 sm:min-w-[450px] lg:w-[900px] lg:grid-cols-2">
        {active === "1" || active === "2"
          ? currentRecordsItems?.map((record) => {
              return (
                <RecordCard
                  key={record.id}
                  record={record}
                  userPage="userPage"
                  recordsItems={recordsItems}
                  setRecordsItems={setRecordsItems}
                />
              );
            })
          : null}
        {active === "3"
          ? currentEventsItems?.map((event) => {
              return <EventCard key={event.id} event={event} />;
            })
          : null}
      </div>
    </>
  );
}
