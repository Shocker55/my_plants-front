import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateBlog = () => {
  const [title, setTitle] = useState("");
  const [contents, setContents] = useState("");
  const router = useRouter();

  const onClick = async () => {
    try {
      await axiosInstance.post("/blogs", { title, contents });
      router.push("/blogs");
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div className="mx-auto w-[1000px]">
      <h1>ブログ一覧画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/blogs" className="font-medium text-blue-600 hover:underline">
          記事一覧画面
        </Link>
      </div>
      <h2>タイトルを入力してください</h2>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[500px] border"
        />
      </div>
      <h2>本文を入力してください</h2>
      <div>
        <textarea
          value={contents}
          onChange={(e) => setContents(e.target.value)}
          className="h-[300px] w-[500px] border"
        />
      </div>
      <div className="mt-5">
        <button onClick={onClick} className="border bg-blue-300">
          記事を作成する
        </button>
      </div>
    </div>
  );
};

export default CreateBlog;
