import Feed from "@/components/Feed";
import RecordList from "@/components/RecordList";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Meta from "@/components/meta";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records?page=1`);
  const records = await res.json();

  const anotherRes = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events?page=1`);
  const events = await anotherRes.json();

  return { props: { records, events } };
}

export default function Home({ records, events }) {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/users/${currentUser.uid}`);
        if (res.data.profile) {
          setProfile(true);
        } else {
          router.push("/profiles/create");
        }
      } catch (error) {
        console.log(error);
      }
    };

    if (currentUser && !profile) {
      fetchProfile();
    }
  }, []);

  return (
    <>
      <Meta />
      <div className="flex h-screen justify-center">
        <Sidebar />
        <Feed pageTitle="ホーム">
          <RecordList records={records} />
        </Feed>
        <Widgets data={events} type="events" />
      </div>
    </>
  );
}
