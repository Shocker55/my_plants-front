import Image from "next/image";
import Link from "next/link";
import { AiOutlineUser } from "react-icons/ai";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${params.id}`);
  const user = await res.json();

  if (!user) {
    return {
      notFound: true,
    };
  }
  return { props: { user } };
}

const User = ({ user }) => {
  return (
    <div className="mx-auto w-[1000px]">
      <h1>ユーザー詳細画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <div>
          <h2 className="font-bold">avatar</h2>
          {user.avatar.url ? (
            <Image
              src={user.avatar.url}
              alt=""
              width={96}
              height={96}
              className="mr-3 rounded-full"
            />
          ) : (
            <AiOutlineUser className="mr-3 w-[96px] rounded-full bg-slate-300 text-8xl" />
          )}
        </div>
        <div>
          <h2 className="font-bold">name</h2>
          <h2>{user.name}</h2>
        </div>
      </div>
      <div>
        <h2 className="font-bold">Bio</h2>
        <p>{user.bio}</p>
      </div>
    </div>
  );
};

export default User;
