import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import AttendeeCard from "./AttendeeCard";

export default function WidgetsAttendeeList({
  event,
  isCurrentUserAttend,
  setIsCurrentUserAttend,
  attendees,
  setAttendees,
  attendeesCount,
  setAttendeesCount,
}) {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  const handleClickEventAttend = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.post("/event_attendees", { event_id: event.id }, config);
      const res = await axiosInstance.get(`/events/${event.id}`);
      setAttendees((prev) => res.data.event_attendees);
      setAttendeesCount((prev) => prev + 1);
      setIsCurrentUserAttend(true);
    } catch (err) {
      alert("参加登録に失敗しました");
    }
  };

  const handleClickEventCancel = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/event_attendees/${event.id}`, config);
      const filterAttendees = attendees.filter((attendee) => attendee.user.uid !== currentUser.uid);
      setAttendees((prev) => filterAttendees);
      setAttendeesCount((prev) => prev - 1);
      setIsCurrentUserAttend(false);
    } catch (err) {
      alert("参加登録の取り消しに失敗しました");
    }
  };

  return (
    <>
      <div className="pb-2 pt-5 text-center">
        {isCurrentUserAttend === true ? (
          <button
            onClick={handleClickEventCancel}
            className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
          >
            参加を取り消す
          </button>
        ) : (
          <button
            onClick={handleClickEventAttend}
            className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
          >
            イベントに参加する
          </button>
        )}
      </div>
      <div className="hidden-scrollbar bg-second-color h-custom2 sticky top-16 mx-3 space-y-3 overflow-y-scroll rounded-xl pt-2 text-gray-700">
        <h4 className="px-4 font-bold">
          参加予定のユーザー{attendeesCount ? <>({attendeesCount})</> : null}
        </h4>
        {attendees?.map((attendee) => {
          return <AttendeeCard key={attendee.id} user={attendee.user} />;
        })}
      </div>
    </>
  );
}
