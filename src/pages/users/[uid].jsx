import Feed from "@/components/Feed";
import MyRecordList from "@/components/MyRecordList";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${params.uid}`);
  const user = await res.json();

  if (!user) {
    return {
      notFound: true,
    };
  }

  const anotherRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMEIN}/records?q=own&uid=${params.uid}`
  );
  const userRecords = await anotherRes.json();

  return { props: { user, userRecords } };
}

const User = ({ userRecords, user }) => {
  const [recordsItems, setRecordsItems] = useState(userRecords);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed
        pageTitle="ユーザー"
        list={MyRecordList({ recordsItems, setRecordsItems, user })}
        user={user.profile}
      />
      <Widgets data={recordsItems} />
    </div>
  );
};

export default User;
