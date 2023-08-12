import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users`);
  // const res = await fetch("http://localhost:3010/blogs");
  const users = await res.json();

  return { props: { users } };
}

const Users = ({ users }) => {
  return (
    <div className="mx-auto w-[1000px]">
      <h1>ユーザ一覧画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <ul>
          {users?.map((user) => (
            <Link href={`/users/${user.id}`} key={user.id}>
              <div className="m-1 flex border p-3 font-medium hover:bg-slate-300">
                {user.avatar.url ? (
                  <img src={user.avatar.url} alt="" className="mr-3 w-[70px] rounded-full" />
                ) : (
                  <AiOutlineUser className="mr-3 w-[70px] rounded-full bg-slate-300 text-6xl" />
                )}
                <div>
                  <div>ユーザー名: {user.name}</div>
                  <div>ひとこと: {user.bio}</div>
                </div>
              </div>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
