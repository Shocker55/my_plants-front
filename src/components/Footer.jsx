import Link from "next/link";
import React from "react";
import { FaHouse, FaMagnifyingGlass, FaRegRectangleList, FaRegUser } from "react-icons/fa6";

export default function Footer() {
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
        <Link href="/users">
          <FaRegUser />
        </Link>
      </div>
    </div>
  );
}
