import {
  FaHouse,
  FaMagnifyingGlass,
  FaRegBookmark,
  FaRegRectangleList,
  FaRegUser,
  FaEllipsis,
} from "react-icons/fa6";

import SidebarMenuItem from "./SidebarMenuItem";

export default function Sidebar() {
  return (
    <div className="items 2xl:ml-[300px hidden h-full flex-col p-2 md:inline-block xl:w-[210px]">
      <div className="mb-5 flex flex-col items-center xl:items-start">
        <h1 className="logo-text-color text-3xl font-semibold">MyPlants</h1>
      </div>

      {/* menu */}
      <SidebarMenuItem text="ホーム" Icon={FaHouse} />
      <SidebarMenuItem text="検索する" Icon={FaMagnifyingGlass} />
      <SidebarMenuItem text="ブックマーク" Icon={FaRegBookmark} />
      <SidebarMenuItem text="イベント情報" Icon={FaRegRectangleList} />
      <SidebarMenuItem text="プロフィール" Icon={FaRegUser} />
      <SidebarMenuItem text="ユーザー" Icon={FaEllipsis} />

      {/* button */}
      <button className="mt-5 rounded-3xl bg-slate-400 px-4 py-2 font-black text-white hover:bg-slate-500 hover:text-white">
        記事を書く
      </button>
    </div>
  );
}
