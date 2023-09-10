import BookmarkList from "@/components/BookmarkList";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Bookmarks = () => {
  const { currentUser } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (!currentUser) {
      return router.push("/login");
    }
  }, []);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="ブックマーク" list={BookmarkList()} />
      <Widgets />
    </div>
  );
};

export default Bookmarks;
