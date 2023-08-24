import CommentForm from "@/components/CommentForm";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records/${params.id}`);
  const record = await res.json();

  if (record.status) {
    return {
      notFound: true,
    };
  }

  return { props: { record } };
}

const Record = ({ record }) => {
  const [commentItems, setCommentItems] = useState(record.record_comments);

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px] ">
        {/* Header */}
        <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
          <h2 className="text-xl font-bold">記事詳細</h2>
        </div>

        <div className="flex h-[180px] justify-center sm:w-[450px] lg:w-[900px]">
          <div className="mx-1 h-[180px] w-[450px] lg:w-[844px] ">
            <div className="my-2 flex rounded-lg border bg-blue-200 py-3 lg:w-[844px]">
              <div>
                {record.user.profile.avatar.url ? (
                  <Image
                    src={record.user.profile.avatar.url}
                    alt=""
                    width={130}
                    height={130}
                    className="min-h-[120px] min-w-[120px] rounded-full p-2"
                  />
                ) : (
                  <Image
                    src="/images/photo_icon.png"
                    alt=""
                    width={150}
                    height={150}
                    className="h-[120px] w-[120px] rounded"
                  />
                )}
              </div>
              <div className="pl-3">
                <div className="font-bold">{record.user.profile.name}</div>
                <div>{record.user.profile.bio}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-1 sm:w-[450px] lg:w-[900px]">
          <div className="flex w-[500px] flex-col">
            <h2 className="pb-2 text-lg font-semibold">{record.title}</h2>
            {record.image.url ? (
              <Image
                src={record.image.url}
                alt=""
                width={500}
                height={380}
                className="rounded-xl px-3"
              />
            ) : null}
            <div className="pb-3 pt-1">
              <h3>本文</h3>
              <div className="min-h-[80px] border border-gray-400">
                <div className="p-1">{record.body}</div>
              </div>
            </div>
            <div className="border border-red-500">
              <h3>コメント</h3>
              <div className="border bg-white">
                <div className="p-1">Comments List</div>
                {console.log(commentItems)}
                {commentItems.map((comment) => (
                  <div key={comment.id}>
                    {console.log(comment)}
                    <div>{comment.comment}</div>
                    <div>{comment.user.profile.name}</div>
                    <div>{comment.user.profile.avatar.url}</div>
                  </div>
                ))}
              </div>
              <CommentForm data={record} setCommentItems={setCommentItems} />
            </div>
          </div>
        </div>
      </div>
      <Widgets />
    </div>
  );
};

export default Record;
