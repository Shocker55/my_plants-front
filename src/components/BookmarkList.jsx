import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import React, { useEffect, useState } from "react";
import EventCard from "./EventCard";

export default function BookmarkList() {
  const { currentUser } = useAuthContext();
  const [currentBookmarksItems, setCurrentBookmarkItems] = useState([]);
  const [active, setActive] = useState("1");

  const config = {
    headers: {
      authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
    },
  };

  // useEffect(() => {
  //   const fetchBookmarkRecords = async () => {
  //     const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/bookmarks`)
  //     const bookmarkRecords = await res.json();
  //     setCurrentBookmarkItems(bookmarkRecords);
  //   };
  //   fetchBookmarkRecords();
  // }, []);

  const handleClickRecords = async (e) => {
    setActive(e.target.id);
  };

  const handleClickEvents = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/event_bookmarks`,
      config
    );
    const currentBookmarkEvents = await res.data;
    setCurrentBookmarkItems(currentBookmarkEvents);
  };

  return (
    <div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pinter underline" : "cursor-pointer text-slate-500"}
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
        {active === "2"
          ? currentBookmarksItems?.map((item) => <EventCard key={item.id} event={item} />)
          : null}
      </div>
    </div>
  );
}
