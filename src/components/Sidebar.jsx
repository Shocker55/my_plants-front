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
      <SidebarMenuItem text="検索する" Icon={FaMagnifyingGlass} />
      <SidebarMenuItem text="ブックマーク" Icon={FaRegBookmark} />
      <Link href="/events">
        <SidebarMenuItem text="イベント情報" Icon={FaRegRectangleList} />
      </Link>
      <Link href="/users">
        <SidebarMenuItem text="ユーザー" Icon={FaRegUser} />
      </Link>
      {currentUser ? (
        <>
          <Link href={`/users/${currentUser.uid}`}>
            <SidebarMenuItem text="マイページ" Icon={FaSeedling} />
          </Link>
          <Link href="/create-record">
            <button className="mt-5 rounded-3xl bg-slate-400 px-4 py-2 font-black text-white hover:bg-slate-500 hover:text-white">
              記事を書く
            </button>
          </Link>
          <div>
            <button onClick={handleLogout} className="border bg-red-300">
              ログアウト
            </button>
          </div>
        </>
      ) : (
        <>
          <div>
            <Link href="/signup" className="mr-3 border bg-slate-300">
              ユーザー登録
            </Link>
          </div>
          <div>
            <Link href="/login" className="border bg-blue-300">
              ログイン
            </Link>
          </div>
        </>
      )}
    </div>
  );
}
