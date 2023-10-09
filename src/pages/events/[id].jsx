import Dropdown from "@/components/Dropdown";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Image from "next/image";
// import Link from "next/link";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Link from "next/link";
import { FaBookmark, FaRegBookmark, FaRegCalendarCheck } from "react-icons/fa6";
import { CommentCard } from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import Map from "@/components/Map";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events/${params.id}`);
  const event = await res.json();

  if (event.status) {
    return {
      notFound: true,
    };
  }

  return { props: { event } };
}

const Event = ({ event }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [commentItems, setCommentItems] = useState([...event.event_comments]);
  const [isCurrentUserBookmarked, setIsCurrentUserBookmarked] = useState(false);
  const [isCurrentUserAttend, setIsCurrentUserAttend] = useState(false);
  const [attendees, setAttendees] = useState([...event.event_attendees]);
  const [attendeesCount, setAttendeesCount] = useState(event.event_attendees.length);

  const updatedDate = new Date(event.updated_at);
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  const formatDate = (date, dateType) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    const day = date.getDate();
    if (dateType === "full_date") {
      return `${year}年${month.toString().padStart(2, "0")}月${day.toString().padStart(2, "0")}日`;
    } else {
      return `${year}年${month.toString().padStart(2, "0")}月`;
    }
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  useEffect(() => {
    const currentUserAttendEvents = event.event_attendees.filter((event) => {
      return event.user.uid === currentUser?.uid;
    });
    if (currentUserAttendEvents.length) {
      setIsCurrentUserAttend(true);
    }
  }, []);

  const clickDeleteButton = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/events/${event.id}`, config);
      router.push("/events");
    } catch (err) {
      alert("イベントの削除に失敗しました");
    }
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
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="イベント詳細">
        <div className="flex justify-center px-1 sm:min-w-[450px] lg:w-[900px]">
          <div className="flex w-[500px] flex-col">
            <div className="mb-3 mt-3 rounded-2xl bg-white p-3">
              <div className="flex justify-between">
                <div className="flex w-full justify-between">
                  <h2 className="text-lg font-semibold">{event.title}</h2>
                  {isCurrentUserBookmarked === true ? (
                    <button onClick={() => clickUnBookmarkButton()}>
                      <FaBookmark className="my-auto mr-3 text-lg text-blue-400" />
                    </button>
                  ) : (
                    <button onClick={() => clickBookmarkButton()}>
                      <FaRegBookmark className="my-auto mr-3 text-lg text-blue-400" />
                    </button>
                  )}
                </div>
                {currentUser && event.user.uid === currentUser.uid ? (
                  <Dropdown>
                    <Link
                      href={`/events/${event.id}/edit`}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      編集
                    </Link>
                    <button
                      onClick={() => {
                        clickDeleteButton();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-700"
                      role="menuitem"
                    >
                      削除
                    </button>
                  </Dropdown>
                ) : null}
              </div>
              <div className="pt-1">開始日時: {formatDate(startDate, event.date_type)}</div>
              <div className="pb-2 pt-1">終了日時: {formatDate(endDate, event.date_type)}</div>
              {event.start_time ? (
                <div className="pb-2 pt-1">
                  時間: {formatTime(startTime)} ~ {formatTime(endTime)}
                </div>
              ) : null}
              <div>
                場所:
                <p className="p-1">{event.place}</p>
              </div>
              {event.official_url ? (
                <div>
                  公式URL:
                  <a
                    href={event.official_url}
                    className="block p-1 text-blue-400 hover:cursor-pointer hover:underline"
                  >
                    {event.official_url}
                  </a>
                </div>
              ) : null}
              <div className="pb-3 pt-1">
                <div className="min-h-[80px]">
                  <div className="whitespace-pre-wrap p-1">{event.body}</div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center">
                <Map latitude={event.latitude} longitude={event.longitude} />
              </div>
              <div className="flex items-end justify-end p-1">
                <div className="mr-4 flex">
                  <FaRegCalendarCheck className="my-auto mr-1 text-lg" />
                  {attendeesCount ? <>参加予定: {attendeesCount}名</> : "0"}
                </div>
                <div className="pr-1 text-sm text-slate-500">
                  {updatedDate.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="mb-20 rounded-2xl bg-white p-3">
              <h3 className="border-b border-slate-400 text-lg">コメント</h3>
              <div>
                {commentItems.map((comment) => (
                  <div key={comment.id}>
                    <CommentCard
                      comment={comment}
                      commentItems={commentItems}
                      setCommentItems={setCommentItems}
                      type="event"
                    />
                  </div>
                ))}
              </div>
              <CommentForm data={event} setCommentItems={setCommentItems} type="event" />
            </div>
          </div>
        </div>
      </Feed>
      <Widgets
        type="eventAttend"
        data={event}
        isCurrentUserAttend={isCurrentUserAttend}
        setIsCurrentUserAttend={setIsCurrentUserAttend}
        attendees={attendees}
        setAttendees={setAttendees}
        attendeesCount={attendeesCount}
        setAttendeesCount={setAttendeesCount}
      />
    </div>
  );
};

export default Event;
