import Feed from "@/components/Feed";
import RecordList from "@/components/RecordList";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { Inter } from "next/font/google";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records`);
  const records = await res.json();

  const anotherRes = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events`);
  const events = await anotherRes.json();

  return { props: { records, events } };
}

export default function Home({ records, events }) {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [profile, setProfile] = useState(false);

  useEffect(() => {
    if (currentUser) {
      const fetchProfile = async () => {
        await axiosInstance
          .get(`/users/${currentUser.uid}`)
          .then((res) => {
            if (res.data.profile) {
              setProfile(true);
            } else {
              router.push("/create-profile");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      };
      fetchProfile();
    }
    return () => {
      setProfile(false);
    };
  }, [currentUser]);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="Home">
        <RecordList records={records} />
      </Feed>
      <Widgets data={events} type="events" />
    </div>
  );
}
