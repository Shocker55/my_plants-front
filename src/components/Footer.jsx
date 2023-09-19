import Link from "next/link";
import React from "react";
import {
  FaHouse,
  FaMagnifyingGlass,
  FaPencil,
  FaRegBookmark,
  FaRegRectangleList,
  FaRegUser,
  FaSeedling,
} from "react-icons/fa6";
import FooterDropdown from "./FooterDropdown";
import { useAuthContext } from "@/context/AuthContext";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/initFirebase";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  return (
    <div className="fixed bottom-0 z-50 flex h-12 w-full max-w-xl bg-slate-50 md:hidden">
      <div className="flex w-full items-center justify-around">
        <Link href="/">
          <FaHouse />
        </Link>
        <Link href="/search">
          <FaMagnifyingGlass />
        </Link>
        <Link href="/events">
          <FaRegRectangleList />
        </Link>
        {currentUser ? (
          <Link href={`/users/${currentUser.uid}`}>
            <FaSeedling />
          </Link>
        ) : (
          <Link href={"/users"}>
            <FaRegUser />
          </Link>
        )}
        <FooterDropdown>
          {currentUser ? (
            <>
              <Link href="/create-record" className="block px-4 py-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaPencil className="mr-3" /> 記事を書く
                </div>
              </Link>
              <Link href="/users" className="block px-4 py-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaRegUser className="mr-3" /> ユーザー
                </div>
              </Link>
              <Link href="/bookmarks" className="block px-4 py-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaRegBookmark className="mr-3" /> ブックマーク
                </div>
              </Link>
              <button onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <p className="ml-7 text-red-200">ログアウト</p>
                </div>
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="block px-4 py-2 text-sm text-gray-700">
                <div className="flex items-center">
                  <FaRegUser className="mr-3" /> ログイン
                </div>
              </Link>
            </>
          )}
        </FooterDropdown>
      </div>
    </div>
  );
}
