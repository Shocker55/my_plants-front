import Image from "next/image";

export default function Feed({ pageTitle, list, user }) {
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

      {pageTitle === "ユーザー" ? (
        <div className="flex sm:w-[450px] lg:w-[900px]">
          <div className="mx-2 my-2 flex h-[180px] w-[418px] rounded-lg border bg-blue-200 py-3 lg:w-[844px]">
            <div>
              {user.avatar.url ? (
                <Image
                  src={user.avatar.url}
                  alt=""
                  width={130}
                  height={130}
                  className="min-h-[120px] min-w-[120px] rounded-full p-2"
                />
              ) : (
                <Image
                  src="/images/photo_icon.png"
                  alt=""
                  width={150}
                  height={150}
                  className="h-[120px] w-[120px] rounded"
                />
              )}
            </div>
            <div className="pl-3">
              <div className="font-bold">{user.name}</div>
              <div>{user.bio}</div>
            </div>
          </div>
        </div>
      ) : null}

      {/* List */}
      {list}
    </div>
  );
}
