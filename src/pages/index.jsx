import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        await axiosInstance
          .get(`/profiles/${currentUser.uid}`)
          .then((res) => {
            if (res.data) {
              setProfile(true);
            } else {
              router.push("/create-profile");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchProfile();
    }
    return () => {
      setProfile(false);
    };
  }, [currentUser]);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed />
      <Widgets />
      {/* {currentUser && profile ? (
        <div className="m-auto w-[1000px]">
          <h1>ブログアプリ</h1>
          <div className="m-3 flex">
            <Link href="/signup" className="mr-3 border bg-slate-300">
              ユーザー登録
            </Link>
            <Link href="/login" className="border bg-blue-300">
              ログイン
            </Link>
          </div>
          <div>
            <button onClick={handleLogout} className="border bg-red-300">
              ログアウト
            </button>
          </div>
          <div>
            <Link href="/records" className="font-medium text-blue-600 hover:underline">
              記録一覧画面
            </Link>
          </div>
        </div>
      ) 
      : (
        <div>Loading ...</div>
      )} */}
    </div>
  );
}
