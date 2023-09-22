import { useEffect, useState } from "react";
import EventCard from "./EventCard";
import { axiosInstance } from "@/utils/axios";
import { useAuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";

export default function EventList({ events }) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [currentEventsItems, setCurrentEventsItems] = useState([...events]);
  const [active, setActive] = useState("1");
  const [slug, setSlug] = useState("events?");
  const [page, setPage] = useState(1);
  const [nextPage, setNextPage] = useState(false);
  const [loading, setLoading] = useState(false);

  const fetchData = async (pageNumber) => {
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/${slug}page=${pageNumber}`
      );
      const data = await res.data;
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    const fetch = async () => {
      try {
        const nextPageData = await fetchData(2);
        if (nextPageData.length !== 0) {
          setNextPage(true);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetch();
  }, [active]);

  const handleClickMore = () => {
    setLoading(true);
    const fetchEvent = async () => {
      try {
        const events = await fetchData(page + 1);
        const nextPage = await fetchData(page + 2);
        setCurrentEventsItems((prev) => prev.concat(events));
        setPage((prev) => prev + 1);
        if (nextPage.length !== 0) {
          setNextPage(true);
        } else {
          setNextPage(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchEvent();
    setLoading(false);
  };

  const handleClickRecentEvents = async (e) => {
    setActive(e.target.id);
    setSlug("events?");
    setPage(1);
    setNextPage(false);
    try {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events?page=1`);
      const recentEvents = await res.data;
      setCurrentEventsItems(recentEvents);
    } catch (err) {
      alert("最近のイベントの取得に失敗しました");
    }
  };

  const handleClickAttendEvents = async (e) => {
    if (!currentUser) {
      return router.push("/login");
    }
    setActive(e.target.id);
    setSlug(`users/${currentUser.uid}/attend?`);
    setPage(1);
    setNextPage(false);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/users/${currentUser.uid}/attend?page=1`
      );
      const attendEvents = await res.data;
      setCurrentEventsItems(attendEvents);
    } catch (err) {
      alert("参加予定のイベントの取得に失敗しました");
    }
  };

  const handleClickPastEvents = async (e) => {
    setActive(e.target.id);
    setSlug("events?q=past&");
    setPage(1);
    setNextPage(false);
    try {
      const res = await axiosInstance.get(
        `${process.env.NEXT_PUBLIC_API_DOMEIN}/events?q=past&page=1`
      );
      const pastEvents = await res.data;
      setCurrentEventsItems(pastEvents);
    } catch (err) {
      alert("過去のイベントの取得に失敗しました");
    }
  };

  return (
    <>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div
          id="1"
          className={active === "1" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickRecentEvents(e)}
        >
          最近の更新
        </div>
        <div
          id="2"
          className={active === "2" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickAttendEvents(e)}
        >
          参加予定
        </div>
        <div
          id="3"
          className={active === "3" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"}
          onClick={(e) => handleClickPastEvents(e)}
        >
          過去のイベント
        </div>
      </div>
      <div className="mb-10 grid grid-cols-1 place-items-center gap-1 sm:min-w-[450px] lg:w-[900px] lg:grid-cols-2">
        {currentEventsItems?.map((event) => {
          return <EventCard key={event.id} event={event} />;
        })}
      </div>
      {nextPage ? (
        <div className="mb-20 justify-center text-blue-500">
          {loading ? (
            <div role="status" className="mt-10 grid justify-items-center">
              <svg
                aria-hidden="true"
                className="h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="hidden">Loading...</span>
            </div>
          ) : (
            <button onClick={handleClickMore} className="w-full">
              もっと見る
            </button>
          )}
        </div>
      ) : (
        <div className="mb-10"></div>
      )}
    </>
  );
}
