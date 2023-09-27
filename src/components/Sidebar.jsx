import {
  FaHouse,
  FaMagnifyingGlass,
  FaRegBookmark,
  FaRegRectangleList,
  FaRegUser,
  FaSeedling,
} from "react-icons/fa6";

import SidebarMenuItem from "./SidebarMenuItem";
import Link from "next/link";
import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/initFirebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/router";

export default function Sidebar() {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <div className="items 2xl:ml-[300px hidden h-full flex-col p-2 md:inline-block xl:w-[210px]">
      <div className="mb-5 flex flex-col items-center xl:items-start">
        <h1 className="logo-text-color text-3xl font-semibold">MyPlants</h1>
      </div>

      {/* menu */}
      <Link href="/">
        <SidebarMenuItem text="ホーム" Icon={FaHouse} />
      </Link>
      <Link href="/search">
        <SidebarMenuItem text="検索する" Icon={FaMagnifyingGlass} />
      </Link>
      <Link href="/events">
        <SidebarMenuItem text="イベント情報" Icon={FaRegRectangleList} />
      </Link>
      <Link href="/users">
        <SidebarMenuItem text="ユーザー" Icon={FaRegUser} />
      </Link>
      {currentUser ? (
        <>
          <Link href="/bookmarks">
            <SidebarMenuItem text="ブックマーク" Icon={FaRegBookmark} />
          </Link>
          <Link href={`/users/${currentUser.uid}`}>
            <SidebarMenuItem text="マイページ" Icon={FaSeedling} />
          </Link>
          <Link href="/records/create">
            <button className="mt-5 rounded-3xl bg-slate-400 px-4 py-2 font-black text-white hover:bg-slate-500 hover:text-white">
              記事を書く
            </button>
          </Link>
          <div className="absolute bottom-20">
            <button
              onClick={handleLogout}
              className="rounded-3xl bg-red-300 px-4 py-2 text-white hover:bg-red-400"
            >
              ログアウト
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="absolute bottom-32">
            <Link
              href="/signup"
              className="rounded-3xl bg-slate-400 px-4 py-2 font-black text-white hover:bg-slate-500 hover:text-white"
            >
              ユーザー登録
            </Link>
          </div>
          <div className="absolute bottom-20">
            <Link
              href="/login"
              className="mt-8 rounded-3xl bg-blue-400 px-4 py-2 font-black text-white hover:bg-blue-500 hover:text-white"
            >
              ログイン
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
