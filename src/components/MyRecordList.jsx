import { useEffect, useState } from "react";
import RecordCard from "./RecordCard";
import { useAuthContext } from "@/context/AuthContext";

export default function MyRecordList({ recordsItems, setRecordsItems, user }) {
  const { currentUser } = useAuthContext();
  const [currentRecordsItems, setCurrentRecordsItems] = useState(recordsItems);
  const [active, setActive] = useState("1");

  useEffect(() => {
    setCurrentRecordsItems(recordsItems);
  }, [recordsItems]);

  const handleClick = async (e) => {
    setActive(e.target.id);
    setCurrentRecordsItems(recordsItems);
  };

  const handleClickLikes = async (e) => {
    setActive(e.target.id);
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${user.uid}/likes`);
    const currentLikeRecords = await res.json();
    setCurrentRecordsItems(currentLikeRecords);
  };

  return (
    <>
      <div className="mb-3 ml-1 font-bold">Records</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        {currentUser?.uid === user.uid ? (
          <>
            <div
              id="1"
              className={
                active === "1" ? "cursor-pinter underline" : "cursor-pointer text-slate-500"
              }
              onClick={(e) => handleClick(e)}
            >
              Own Records
            </div>
            <div
              id="2"
              className={
                active == "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
              }
              onClick={(e) => handleClickLikes(e)}
            >
              Likes
            </div>
            <div className="text-slate-500">Events</div>
          </>
        ) : (
          <>
            <div
              id="1"
              className={
                active == "1" ? "cursor-pinter underline" : "cursor-pointer text-slate-500"
              }
              onClick={(e) => handleClick(e)}
            >
              Recent
            </div>
            <div
              id="2"
              className={
                active == "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
              }
              onClick={(e) => handleClickLikes(e)}
            >
              Likes
            </div>
            <div className="text-slate-500">Events</div>
          </>
        )}
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {currentRecordsItems?.map((record) => {
          return (
            <RecordCard
              key={record.id}
              record={record}
              userPage="userPage"
              recordsItems={recordsItems}
              setRecordsItems={setRecordsItems}
            />
          );
        })}
      </div>
    </>
  );
}
