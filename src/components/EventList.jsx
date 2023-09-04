import React from "react";
import EventCard from "./EventCard";

export default function EventList(events) {
  return (
    <>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div className="underline">最近の更新</div>
        <div className="text-slate-500">参加予定</div>
        <div className="text-slate-500">過去のイベント</div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {events?.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
    </>
  );
}
