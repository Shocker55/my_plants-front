import { useAuthContext } from "@/context/AuthContext";
import { auth } from "@/lib/initFirebase";
import { signOut } from "firebase/auth";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const { user } = useAuthContext();
  const handleLogout = () => {
    signOut(auth);
    router.push("/");
  };

  useEffect(() => {
    if (!user) {
      router.push("/login");
    }
  });

  return (
    <>
      {user ? (
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
        </div>
      ) : (
        <div>Loading ...</div>
      )}
    </>
  );
}
