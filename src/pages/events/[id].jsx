// import { CommentCard } from "@/components/CommentCard";
// import CommentForm from "@/components/CommentForm";
import Dropdown from "@/components/Dropdown";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Image from "next/image";
// import Link from "next/link";
// import { useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/events/${params.id}`);
  const event = await res.json();

  if (event.status) {
    return {
      notFound: true,
    };
  }

  return { props: { event } };
}

const Event = ({ event }) => {
  // const [commentItems, setCommentItems] = useState(record.record_comments);
  const updatedDate = new Date(event.updated_at);
  const startDate = new Date(event.start_date);
  const endDate = new Date(event.end_date);
  const startTime = new Date(event.start_time);
  const endTime = new Date(event.end_time);

  const formatDate = (date, dateType) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    const day = date.getDate();
    if (dateType === "date_only") {
      return `${year}年${month.toString().padStart(2, "0")}月${day.toString().padStart(2, "0")}日`;
    } else {
      return `${year}年${month.toString().padStart(2, "0")}月`;
    }
  };

  const formatTime = (time) => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");

    return `${hours}:${minutes}`;
  };

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px] ">
        {/* Header */}
        <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
          <h2 className="text-xl font-bold">イベント詳細</h2>
        </div>

        <div className="flex justify-center px-1 sm:w-[450px] lg:w-[900px]">
          <div className="flex w-[500px] flex-col">
            <div className="mb-3 mt-3 rounded-2xl bg-white p-3">
              <div className="flex justify-between">
                <h2 className="pb-2 text-lg font-semibold">{event.title}</h2>
                <Dropdown event={event} />
              </div>
              <div className="pt-1">開始日時: {formatDate(startDate, event.date_type)}</div>
              <div className="pb-3 pt-1">終了日時: {formatDate(endDate, event.date_type)}</div>
              {event.start_time ? (
                <div className="pb-3 pt-1">
                  時間: {formatTime(startTime)} ~ {formatTime(endTime)}
                </div>
              ) : null}
              {event.official_url ? (
                <div>
                  公式URL: <div>{event.official_url}</div>
                </div>
              ) : null}
              <div className="pb-3 pt-1">
                <div className="min-h-[80px]">
                  <div className="whitespace-pre-wrap p-1">{event.body}</div>
                </div>
                <p className="pr-1 text-right text-sm text-slate-500">
                  {updatedDate.toLocaleDateString()}
                </p>
              </div>
            </div>
            {/* <div className="rounded-2xl bg-white p-3">
              <h3 className="border-b border-slate-400 text-lg">コメント</h3>
              <div>
                {commentItems.map((comment) => (
                  <div key={comment.id}>
                    <CommentCard
                      comment={comment}
                      commentItems={commentItems}
                      setCommentItems={setCommentItems}
                    />
                  </div>
                ))}
              </div>
              <CommentForm data={record} setCommentItems={setCommentItems} />
            </div> */}
          </div>
        </div>
      </div>
      {/* <Widgets data={related_records} type="show" /> */}
      <Widgets />
    </div>
  );
};

export default Event;
