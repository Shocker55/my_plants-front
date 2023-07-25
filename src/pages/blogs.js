import Link from "next/link";

const Blogs = () => {
  return (
    <div className="mx-auto w-[1000px]">
      <h1>ブログ一覧画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/create-blog" className="font-medium text-blue-600 hover:underline">
          記事作成画面
        </Link>
      </div>
    </div>
  );
};

export default Blogs;
