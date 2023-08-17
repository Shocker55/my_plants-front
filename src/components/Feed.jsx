export default function Feed({ pageTitle, list }) {
  return (
    <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px]">
      {/* Header */}
      <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
        <h2 className="text-xl font-bold">{pageTitle}</h2>
      </div>

      {/* Slider */}
      {pageTitle === "Home" ? (
        <div className="mx-5 my-2 flex h-[200px] w-[418px] space-x-4 overflow-x-scroll rounded-lg border bg-blue-200 lg:w-[844px]">
          <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
          <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
          <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
          <div className="h-full min-w-[300px] rounded-lg bg-blue-100">image</div>
        </div>
      ) : null}

      {/* List */}
      {list}
    </div>
  );
}
