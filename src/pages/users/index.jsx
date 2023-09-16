import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import UserList from "@/components/UserList";
import Widgets from "@/components/Widgets";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users`);
  // const res = await fetch("http://localhost:3010/blogs");
  const users = await res.json();

  return { props: { users } };
}

const Users = ({ users }) => {
  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="ユーザーリスト">
        <UserList users={users} />
      </Feed>
      <Widgets />
    </div>
  );
};

export default Users;
