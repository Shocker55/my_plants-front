import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";
import RecordCard from "./RecordCard";

export default function BookmarkList() {
  const { currentUser } = useAuthContext();
  const [currentBookmarksRecords, setCurrentBookmarkRecords] = useState([]);
  const [currentBookmarksEvents, setCurrentBookmarkEvents] = useState([]);
  const [active, setActive] = useState("1");

  const config = {
    headers: {
      authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
    },
  };

  useEffect(() => {
    const fetchBookmarkRecords = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/record_bookmarks`,
        config
      );
      const currentBookmarkRecords = await res.json();
      setCurrentBookmarkRecords(currentBookmarkRecords);
    };
    fetchBookmarkRecords();
  }, []);

  const handleClickRecords = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/record_bookmarks`,
      config
    );
    const currentBookmarkRecords = await res.data;
    setCurrentBookmarkRecords(currentBookmarkRecords);
  };

  const handleClickEvents = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/event_bookmarks`,
      config
    );
    const currentBookmarkEvents = await res.data;
    setCurrentBookmarkEvents(currentBookmarkEvents);
  };

  return (
    <div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickRecords(e)}
        >
          Records
        </div>
        <div
          id="2"
          className={active == "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickEvents(e)}
        >
          Events
        </div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {active === "1"
          ? currentBookmarksRecords?.map((item) => <RecordCard key={item.id} record={item} />)
          : null}
        {active === "2"
          ? currentBookmarksEvents?.map((item) => <EventCard key={item.id} event={item} />)
          : null}
      </div>
    </div>
  );
}
