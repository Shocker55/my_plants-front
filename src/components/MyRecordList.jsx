import RecordCard from "./RecordCard";
import { useAuthContext } from "@/context/AuthContext";

export default function MyRecordList({ userRecords, user }) {
  const { currentUser } = useAuthContext();

  return (
    <>
      <div className="mb-3 ml-1 font-bold">Records</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        {currentUser?.uid === user.uid ? (
          <>
            <div className="underline">Own Records</div>
            <div className="text-slate-500">Likes</div>
            <div className="text-slate-500">Bookmarks</div>
            <div className="text-slate-500">Events</div>
          </>
        ) : (
          <>
            <div className="underline">Recent</div>
            <div className="text-slate-500">Likes</div>
            <div className="text-slate-500">Bookmarks</div>
            <div className="text-slate-500">Events</div>
          </>
        )}
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {userRecords?.map((record) => {
          return <RecordCard key={record.id} record={record} userPage="userPage" />;
        })}
      </div>
    </>
  );
}