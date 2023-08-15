import { FaMagnifyingGlass } from "react-icons/fa6";
import EventCard from "./EventCard";

export default function Widgets() {
  return (
    <div className="hidden space-y-5 overflow-y-auto bg-slate-200 px-3 lg:inline xl:w-[350px]">
      <div className="sticky top-0 z-50 w-[90%] py-1.5 xl:w-[90%]">
        <div className="relative flex items-center rounded-full  p-3">
          <FaMagnifyingGlass className="z-50 h-5 text-gray-500" />
          <input
            className="absolute inset-0 rounded-full border-gray-500 bg-gray-100 pl-11 text-gray-700 focus:bg-white focus:shadow-lg "
            type="text"
            placeholder="Search"
          />
        </div>
      </div>

      <div className="bg-second-color w-[90%] space-y-3 rounded-xl py-2 text-gray-700">
        <h3 className="px-4 font-bold">History of My Records</h3>
        <div className="flex justify-between px-4">
          <div>
            <p className="pb-1">Last Record</p>
            <p className="rounded bg-slate-200 text-center">2023/1/1</p>
          </div>
          <div>
            <p className="pb-1">Record Conuts</p>
            <p className="rounded bg-slate-200 text-center">10</p>
          </div>
        </div>
        <div className="pb-2">
          <p className="px-4 pb-1">Upcoming event date</p>
          <p className="text-center text-sm">参加予定のイベントはありません</p>
        </div>
      </div>
      <div className="bg-second-color sticky top-16 w-[90%] space-y-3 rounded-xl pt-2 text-gray-700">
        <h4 className="px-4 text-xl font-bold">Events</h4>
        <div className="space-y-3 px-4 pb-3">
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
          <EventCard />
        </div>
      </div>
    </div>
  );
}
