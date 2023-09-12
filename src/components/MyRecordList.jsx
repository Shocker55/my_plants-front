import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { axiosInstance } from "@/utils/axios";
import EventCard from "./EventCard";

export default function MyRecordList({ recordsItems, setRecordsItems, user, userAttendEvents }) {
  const [currentRecordsItems, setCurrentRecordsItems] = useState(recordsItems);
  const [currentEventsItems, setCurrentEventsItems] = useState(userAttendEvents);
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
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${user.uid}/likes`);
    const currentLikeRecords = await res.json();
    setCurrentRecordsItems(currentLikeRecords);
  };

  const handleClickAttendEvents = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${user.uid}/attend`
    );

    const attendEvents = await res.data;
    setCurrentEventsItems(attendEvents);
  };

  return (
    <>
      <div className="mb-3 ml-1 font-bold">Records</div>
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
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
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
