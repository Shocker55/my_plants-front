import { useState } from "react";
import EventCard from "./EventCard";
import { axiosInstance } from "@/utils/axios";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function EventList(events) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [currentEventsItems, setCurrentEventsItems] = useState(events);
  const [active, setActive] = useState("1");

  const handleClickRecentEvents = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events`);
    const recentEvents = await res.data;
    setCurrentEventsItems(recentEvents);
  };

  const handleClickAttendEvents = async (e) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setActive(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${currentUser.uid}/attend`
    );

    const attendEvents = await res.data;
    setCurrentEventsItems(attendEvents);
  };

  const handleClickPastEvents = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events?q=past`);
    const pastEvents = await res.data;
    setCurrentEventsItems(pastEvents);
  };

  return (
    <>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickRecentEvents(e)}
        >
          最近の更新
        </div>
        <div
          id="2"
          className={active === "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickAttendEvents(e)}
        >
          参加予定
        </div>
        <div
          id="3"
          className={active === "3" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickPastEvents(e)}
        >
          過去のイベント
        </div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {currentEventsItems?.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </>
  );
}
