import { FaMagnifyingGlass } from "react-icons/fa6";
import WidgetsRecordList from "./WidgetsRecordList";
import Link from "next/link";
import WidgetEventCard from "./WidgetsEventCard";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import WidgetsAttendeeList from "./WidgetsAttendeeList";
import { useEffect, useState } from "react";
import { axiosInstance } from "@/utils/axios";
import WidgetsEventList from "./WidgetsEventList";

export default function Widgets({
  data,
  type,
  isCurrentUserAttend,
  setIsCurrentUserAttend,
  attendees,
  setAttendees,
  attendeesCount,
  setAttendeesCount,
}) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [lastRecordDate, setLastRecordDate] = useState("");
  const [recordCount, setRecordCount] = useState(0);
  const [attendEvent, setAttendEvent] = useState({});
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (currentUser) {
      let config = {
        headers: {
          authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        },
      };
      const fetchWidgetData = async () => {
        try {
          const res = await axiosInstance.get(
            `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/widget`,
            config
          );
          const widgetData = await res.data;
          const updatedDate = widgetData.last_record_date
            ? new Date(widgetData.last_record_date)
            : undefined;
          setLastRecordDate(updatedDate);
          setRecordCount(widgetData.record_count);
          setAttendEvent(widgetData.upcoming_event);
          setLoading(false);
        } catch (err) {
          console.log(err);
        }
      };
      fetchWidgetData();
    }
  }, [data, attendees, currentUser]);

  const handleClickEventCreate = () => {
    if (currentUser) {
      router.push("/events/create");
    } else {
      router.push("/login");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue) {
      router.push({ pathname: "/search", query: { q: `${inputValue}` } });
      setInputValue("");
    }
  };

  return (
    <div className="hidden space-y-5 overflow-y-auto bg-slate-200 px-3 xl:inline xl:w-[350px]">
      <div className="sticky top-0 z-50 mx-3 py-1.5 ">
        <form
          method="get"
          onSubmit={handleSubmit}
          className="relative flex items-center rounded-full  p-3"
        >
          <button onClick={handleSubmit} className="z-50 h-5 text-gray-500">
            <FaMagnifyingGlass />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            className="absolute inset-0 rounded-full border-gray-500 bg-gray-100 pl-11 text-gray-700 focus:bg-white focus:shadow-lg "
          />
        </form>
      </div>

      <div className="bg-second-color mx-3 space-y-3 rounded-xl py-2 text-gray-700">
        <h3 className="px-4 font-bold">History of My Records</h3>
        {currentUser ? (
          <>
            <div className="flex justify-between px-4">
              <div>
                <div className="pb-1">Last Record</div>
                <div className="flex h-[24px] w-[120px] items-center justify-center rounded bg-slate-200 text-center">
                  {!loading ? (
                    <>
                      {lastRecordDate ? (
                        <>{lastRecordDate.toLocaleDateString()}</>
                      ) : (
                        <div className="px-1 text-sm">投稿がありません</div>
                      )}
                    </>
                  ) : null}
                </div>
              </div>
              <div>
                <div className="pb-1">Record Counts</div>
                <div className="h-[24px] w-[110px] rounded bg-slate-200 text-center">
                  {!loading ? <> {recordCount ? <>{recordCount}</> : <div>0</div>}</> : null}
                </div>
              </div>
            </div>
            <div className="pb-2">
              <p className="px-4 pb-1">Upcoming event</p>
              <p className="h-[20px] w-full truncate px-4 text-center text-sm">
                {!loading ? (
                  <>
                    {" "}
                    {attendEvent ? (
                      <Link href={`/events/${attendEvent.id}`}>{attendEvent.title}</Link>
                    ) : (
                      <>参加予定のイベントはありません</>
                    )}
                  </>
                ) : null}
              </p>
            </div>
          </>
        ) : (
          <div className="h-[122px]">
            <div className="px-4 text-[14px]">
              ログインすることで、
              <br />
              最新の投稿の履歴や、直近に開催される <br />
              参加予定のイベントが表示されます。
              <br />
            </div>
            <div className="mt-2 hidden px-4 text-sm text-gray-600 min-[1430px]:block">
              <div className="mt-4 flex justify-between px-10">
                <Link href="/signup" className="rounded-lg bg-slate-300 p-2 hover:bg-slate-400">
                  新規登録
                </Link>
                <Link
                  href="/login"
                  className="rounded-lg bg-blue-500 p-2 text-white hover:bg-blue-600"
                >
                  ログイン
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
      {data && (type === "show" || type === "index") ? (
        <div className="hidden-scrollbar bg-second-color h-custom sticky top-16 mx-3 space-y-3 overflow-y-scroll rounded-xl pt-2 text-gray-700">
          <WidgetsRecordList userRecords={data} type={type} />
        </div>
      ) : null}

      {data && type === "events" ? (
        <div className="hidden-scrollbar bg-second-color h-custom sticky top-16 mx-3 space-y-3 overflow-y-scroll rounded-xl pt-2 text-gray-700">
          <h4 className="px-4 text-xl font-bold">Events</h4>
          <WidgetsEventList events={data} />
        </div>
      ) : null}
      {type === "eventCreate" ? (
        <div className="pt-5 text-center">
          <button
            onClick={handleClickEventCreate}
            className="rounded-md bg-slate-500 px-4 py-2 text-white hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-slate-500 focus:ring-opacity-50"
          >
            イベントを作成する
          </button>
        </div>
      ) : null}
      {type === "eventAttend" ? (
        <WidgetsAttendeeList
          event={data}
          isCurrentUserAttend={isCurrentUserAttend}
          setIsCurrentUserAttend={setIsCurrentUserAttend}
          attendees={attendees}
          setAttendees={setAttendees}
          attendeesCount={attendeesCount}
          setAttendeesCount={setAttendeesCount}
        />
      ) : null}
    </div>
  );
}
