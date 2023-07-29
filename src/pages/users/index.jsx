import Link from "next/link";

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
            <Link href={`/users/${user.uid}`} key={user.uid}>
              <li className="m-1 border p-3 font-medium text-blue-600 hover:underline">
                <div>{user.name}</div>
                <div>{user.bio}</div>
              </li>
            </Link>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Users;
