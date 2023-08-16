import RecordCard from "./RecordCard";

export default function Feed({ records }) {
  return (
    <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px]">
      {/* Header */}
      <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      {/* Post */}
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {records?.map((record) => {
          return <RecordCard key={record.id} record={record} />;
        })}
      </div>
    </div>
  );
}
