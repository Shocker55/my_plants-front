import { FaMagnifyingGlass } from "react-icons/fa6";
import WidgetsRecordList from "./WidgetsRecordList";
import Link from "next/link";
import WidgetEventCard from "./WidgetsEventCard";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import WidgetsAttendeeList from "./WidgetsAttendeeList";

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

  const handleClickEventCreate = () => {
    if (currentUser) {
      router.push("/events/create");
    } else {
      router.push("/login");
    }
  };

  return (
    <div className="hidden space-y-5 overflow-y-auto bg-slate-200 px-3 xl:inline xl:w-[350px]">
      <div className="sticky top-0 z-50 mx-3 py-1.5 ">
        <div className="relative flex items-center rounded-full  p-3">
          <FaMagnifyingGlass className="z-50 h-5 text-gray-500" />
          <input
            className="absolute inset-0 rounded-full border-gray-500 bg-gray-100 pl-11 text-gray-700 focus:bg-white focus:shadow-lg "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="bg-second-color mx-3 space-y-3 rounded-xl py-2 text-gray-700">
        <h3 className="px-4 font-bold">History of My Records</h3>
        <div className="flex justify-between px-4">
          <div>
            <p className="pb-1">Last Record</p>
            <p className="rounded bg-slate-200 text-center">2023/1/1</p>
          </div>
          <div>
            <p className="pb-1">Record Counts</p>
            <p className="rounded bg-slate-200 text-center">10</p>
          </div>
        </div>
        <div className="pb-2">
          <p className="px-4 pb-1">Upcoming event date</p>
          <p className="text-center text-sm">参加予定のイベントはありません</p>
        </div>
      </div>
      {data && (type === "show" || type === "index") ? (
        <div className="bg-second-color h-custom sticky top-16 mx-3 space-y-3 rounded-xl pt-2 text-gray-700">
          <WidgetsRecordList userRecords={data} type={type} />
        </div>
      ) : null}

      {data && type === "events" ? (
        <div className="hidden-scrollbar bg-second-color h-custom sticky top-16 mx-3 space-y-3 overflow-y-scroll rounded-xl pt-2 text-gray-700">
          <h4 className="px-4 text-xl font-bold">Events</h4>
          {data?.map((event) => {
            return <WidgetEventCard key={event.id} event={event} className="w-full" />;
          })}
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
