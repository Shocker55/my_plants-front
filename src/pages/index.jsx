import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/initFirebase";
import { axiosInstance } from "@/utils/axios";
import { signOut } from "firebase/auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(false);
  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    }
  });

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = () => {
        axiosInstance
          .get(`/users/${currentUser.uid}`)
          .then((res) => {
            res.data ? setProfile(true) : router.push("/create-profile");
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
    <>
      {currentUser && profile ? (
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
            <Link href="/create-blog" className="font-medium text-blue-600 hover:underline">
              記事作成画面
            </Link>
          </div>
          <div>
            <Link href="/blogs" className="font-medium text-blue-600 hover:underline">
              記事一覧画面
            </Link>
          </div>
          <div>
            <Link href="/users" className="font-medium text-blue-600 hover:underline">
              ユーザ一覧画面
            </Link>
          </div>
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}
