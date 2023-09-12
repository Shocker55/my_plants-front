import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function WidgetsAttendeeList({ event }) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [isCurrentUserAttend, setIsCurrentUserAttend] = useState(false);

  useEffect(() => {
    const currentUserAttendEvents = event.event_attendees.filter((event) => {
      return event.user.uid === currentUser?.uid;
    });
    if (currentUserAttendEvents.length) {
      setIsCurrentUserAttend(true);
    }
  }, []);

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
      // setLikeCount((prev) => prev + 1);
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
      // setLikeCount((prev) => prev - 1);
      setIsCurrentUserAttend(false);
    } catch (err) {
      alert("参加登録の取り消しに失敗しました");
    }
  };

  return (
    <div className="pt-10 text-center">
      {isCurrentUserAttend === true ? (
        <button
          onClick={handleClickEventCancel}
          className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
        >
          イベントに参加を取り消し
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
  );
}
