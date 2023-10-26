import Feed from "@/components/Feed";
import RecordList from "@/components/RecordList";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Head from "next/head";

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
  const meta = {
    title: "MyPlants",
    description:
      "MyPlantsは、多肉植物の育成記録を共有し、関連するイベントへの参加を管理するためのサービスです。多肉植物とそれに関連するイベントに関する情報を整理・保存することができます。",
    ogImage: "/images/default-og-image.png",
    ogUrl: `${process.env.NEXT_PUBLIC_DOMEIN}`,
    siteName: "MyPlants",
    twitterCard: "summary",
    canonicalUrl: `${process.env.NEXT_PUBLIC_DOMEIN}`,
    lang: "ja_JP",
  };

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
      <Head>
        <title>{meta.title}</title>
        <meta name="description" content={meta.description} />
        <meta property="og:type" content="article" />
        <meta property="og:title" content={meta.title} />
        <meta property="og:description" content={meta.description} />
        <meta property="og:url" content={meta.ogUrl} />
        <meta property="og:image" content={meta.ogImage} />
        <meta property="og:site_name" content={meta.siteName} />
        <meta property="og:locale" content={meta.lang} />

        <meta property="twitter:card" content={meta.twitterCard} />
        <meta property="twitter:image" content={meta.ogImage} />

        <link rel="canonical" href={meta.canonicalUrl} />
      </Head>
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
