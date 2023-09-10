import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export default function WidgetEventCard({ event }) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [isCurrentUserBookmarked, setIsCurrentUserBookmarked] = useState(false);
  const updatedDate = new Date(event.updated_at);
  const date = new Date(event.start_date);
  const startTime = new Date(event.start_time);

  let formattedDate = "";
  if (event.date_type === "full_date") {
    // 年、月、日を取得
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    const day = date.getDate();

    // 出力用の文字列を生成
    formattedDate = `${year}年${month.toString().padStart(2, "0")}月${day
      .toString()
      .padStart(2, "0")}日`;
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    formattedDate = `${year}年${month.toString().padStart(2, "0")}月`;
  }

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentUserBookmarkedEvents = event.event_bookmarks.filter((event) => {
      return event.user.uid === currentUser?.uid;
    });
    if (currentUserBookmarkedEvents.length) {
      setIsCurrentUserBookmarked(true);
    }
  }, []);

  const clickBookmarkButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.post("/event_bookmarks", { event_id: event.id }, config);
      setIsCurrentUserBookmarked(true);
    } catch (err) {
      alert("ブックマークに失敗しました");
    }
  };

  const clickUnBookmarkButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/event_bookmarks/${event.id}`, config);
      setIsCurrentUserBookmarked(false);
    } catch (err) {
      alert("ブックマークの取り消しに失敗しました");
    }
  };

  return (
    <div className="record-card-color mx-1 my-3 flex justify-between rounded-lg border border-slate-300">
      <div className="w-full">
        <div className="flex pt-2">
          <div className="mr-3 w-full pl-3">
            <div className="flex justify-between">
              <Link href={`/events/${event.id}`} className="w-[240px]">
                <h3 className="truncate font-bold">{event.title}</h3>
              </Link>
              <div className="pt-1 text-lg">
                {isCurrentUserBookmarked === true ? (
                  <button onClick={() => clickUnBookmarkButton()}>
                    <FaBookmark className="text-blue-400" />
                  </button>
                ) : (
                  <button onClick={() => clickBookmarkButton()}>
                    <FaRegBookmark className="text-blue-400" />
                  </button>
                )}
              </div>
            </div>
            <Link href={`/events/${event.id}`} className="w-full">
              {event.start_time ? (
                <div className="flex">
                  <div>日時： {formattedDate}</div>
                  <div className="pl-2">{formatTime(startTime)} ~</div>
                </div>
              ) : (
                <p>日時： {formattedDate}</p>
              )}
              <div className="flex">
                <div className="inline-block min-w-[52px]">場所 :</div>
                <div className="inline-block">{event.place}</div>
              </div>
              <p className="mb-2 line-clamp-3 h-20 overflow-hidden py-2">{event.body}</p>
              <p className="p-2 text-right text-sm text-slate-500">
                {updatedDate.toLocaleDateString()}
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
