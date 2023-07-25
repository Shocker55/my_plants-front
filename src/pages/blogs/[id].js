import Link from "next/link";

export async function getServerSideProps({params}) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/blogs/${params.id}`);
  // const res = await fetch("http://localhost:3010/blogs");
  const blog = await res.json();

  return { props: { blog } };
}

const Blog = ({ blog }) => {
  return (
    <div className="mx-auto w-[1000px]">
      <h1>ブログ詳細画面</h1>
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
      <div>
        <h2>{blog.title}</h2>
        <h3>本文</h3>
        <p>{blog.contents}</p>
      </div>
    </div>
  );
};

export default Blog;

