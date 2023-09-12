import Feed from "@/components/Feed";
import MyRecordList from "@/components/MyRecordList";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useEffect, useState } from "react";

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

  const attendEventsRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${params.uid}/attend`
  );
  const userAttendEvents = await attendEventsRes.json();

  return { props: { user, userRecords, userAttendEvents } };
}

const User = ({ userRecords, user, userAttendEvents }) => {
  const [recordsItems, setRecordsItems] = useState(userRecords);

  useEffect(() => {
    setRecordsItems(userRecords);
  }, [userRecords]);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed
        pageTitle="ユーザー"
        list={MyRecordList({ recordsItems, setRecordsItems, user, userAttendEvents })}
        user={user}
      />
      <Widgets data={recordsItems} type="index" />
    </div>
  );
};

export default User;
