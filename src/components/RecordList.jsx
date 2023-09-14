import { useState } from "react";
import RecordCard from "./RecordCard";
import { axiosInstance } from "@/utils/axios";

export default function RecordList({ records }) {
  const [recordsItems, setRecordsItems] = useState([...records]);
  const [active, setActive] = useState("1");

  const handleClickRecentUpdates = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records`);
    const recentRecords = await res.data;
    setRecordsItems(recentRecords);
  };

  const handleClickPopularRecords = async (e) => {
    setActive(e.target.id);
    const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records?q=popular`);
    const popularRecords = await res.data;
    setRecordsItems(popularRecords);
  };

  return (
    <>
      <div className="mb-3 ml-1 font-bold">Records</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickRecentUpdates(e)}
        >
          最近の更新
        </div>
        <div
          id="2"
          className={active === "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickPopularRecords(e)}
        >
          人気の記事
        </div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {recordsItems?.map((record) => {
          return (
            <RecordCard
              key={record.id}
              record={record}
              recordsItems={recordsItems}
              setRecordsItems={setRecordsItems}
            />
          );
        })}
      </div>
    </>
  );
}
