import Image from "next/image";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className="m-auto w-[1000px]">
      <h1>ブログアプリ</h1>
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
  );
}
