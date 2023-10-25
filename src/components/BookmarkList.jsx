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
  let config = null;

  if (currentUser) {
    config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };
  }

  useEffect(() => {
    const fetchBookmarkRecords = async () => {
      try {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/record_bookmarks`,
          config
        );
        const currentBookmarkRecords = await res.data;
        setCurrentBookmarkRecords(currentBookmarkRecords);
      } catch (err) {
        alert("記録の取得に失敗しました");
      }
    };
    fetchBookmarkRecords();
  }, []);

  const handleClickRecords = async (e) => {
    setActive(e.target.id);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/record_bookmarks`,
        config
      );
      const currentBookmarkRecords = await res.data;
      setCurrentBookmarkRecords(currentBookmarkRecords);
    } catch (err) {
      alert("記録の取得に失敗しました");
    }
  };

  const handleClickEvents = async (e) => {
    setActive(e.target.id);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/event_bookmarks`,
        config
      );
      const currentBookmarkEvents = await res.data;
      setCurrentBookmarkEvents(currentBookmarkEvents);
    } catch (err) {
      alert("イベントの取得に失敗しました");
    }
  };

  return (
    <div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10 pt-2">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickRecords(e)}
        >
          観察記録
        </div>
        <div
          id="2"
          className={active == "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickEvents(e)}
        >
          イベント
        </div>
      </div>
      <div className="mb-20 grid grid-cols-1 place-items-center gap-1 sm:min-w-[450px] lg:w-[900px] lg:grid-cols-2">
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
