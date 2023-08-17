import RecordCard from "./RecordCard";

export default function RecordList(records) {
  return (
    <>
      <div className="mb-3 ml-1 font-bold">Records</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div className="underline">Recent</div>
        <div className="text-slate-500">Popular</div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {records?.map((record) => {
          return <RecordCard key={record.id} record={record} />;
        })}
      </div>
    </>
  );
}
