import Link from "next/link";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/blogs`);
  // const res = await fetch("http://localhost:3010/blogs");
  const blogs = await res.json();

  return { props: { blogs } };
}

const Blogs = ({ blogs }) => {
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
      <div>
        <ul>
          {blogs?.map((blog) => (
            <Link href={`/blogs/${blog.id}`} key={blog.id}>
              <li className="m-1 border p-3 font-medium text-blue-600 hover:underline">
                {blog.title}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Blogs;
