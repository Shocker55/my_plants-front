import RecordCard from "./RecordCard";

export default function Feed({ records }) {
  return (
    <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px]">
      {/* Header */}
      <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
        <h2 className="text-xl font-bold">Home</h2>
      </div>

      <div className="mx-5 my-2 flex h-[200px] w-[418px] space-x-4 overflow-x-scroll rounded-lg border bg-blue-200 lg:w-[844px]">
        <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
        <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
        <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
        <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
      </div>

      {/* Record */}
      <div className="mb-3 ml-1 font-bold">Records</div>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div className="underline">Latest Record</div>
        <div className="text-slate-500">Popular</div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {records?.map((record) => {
          return <RecordCard key={record.id} record={record} />;
        })}
      </div>
    </div>
  );
}
