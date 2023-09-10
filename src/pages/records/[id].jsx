import { CommentCard } from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import Dropdown from "@/components/Dropdown";
import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records/${params.id}`);
  const record = await res.json();

  if (record.status) {
    return {
      notFound: true,
    };
  }

  const anotherRes = await fetch(
    `${process.env.NEXT_PUBLIC_API_DOMEIN}/records/${params.id}/related_records`
  );
  const related_records = await anotherRes.json();

  return { props: { record, related_records } };
}

const Record = ({ record, related_records }) => {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [commentItems, setCommentItems] = useState(record.record_comments);
  const [isCurrentUserBookmarked, setIsCurrentUserBookmarked] = useState(false);

  const clickDeleteButton = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/records/${record.id}`, config);
      router.back();
    } catch (err) {
      alert("記録の削除に失敗しました");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      return;
    }
    const currentUserBookmarkedRecords = record.record_bookmarks.filter((record) => {
      return record.user.uid === currentUser.uid;
    });
    if (currentUserBookmarkedRecords?.length) {
      setIsCurrentUserBookmarked(true);
    }
  }, []);

  const clickBookmarkButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.post("/record_bookmarks", { record_id: record.id }, config);
      setIsCurrentUserBookmarked(true);
    } catch (err) {
      alert("ブックマークに失敗しました");
    }
  };

  const clickUnBookmarkButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/record_bookmarks/${record.id}`, config);
      setIsCurrentUserBookmarked(false);
    } catch (err) {
      alert("ブックマークの取り消しに失敗しました");
    }
  };

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
            <div className="mb-3 rounded-2xl bg-white p-3">
              <div className="flex justify-between">
                <div className="flex w-full justify-between">
                  <h2 className="pb-2 text-lg font-semibold">{record.title}</h2>
                  {isCurrentUserBookmarked === true ? (
                    <button onClick={() => clickUnBookmarkButton()}>
                      <FaBookmark className="my-auto mr-3 text-lg text-blue-400" />
                    </button>
                  ) : (
                    <button onClick={() => clickBookmarkButton()}>
                      <FaRegBookmark className="my-auto mr-3 text-lg text-blue-400" />
                    </button>
                  )}
                </div>
                {currentUser && record.user.uid === currentUser.uid ? (
                  <Dropdown>
                    {/* <Link
                      href={`/records/${record.id}/edit`}
                      className="block px-4 py-2 text-sm text-gray-700"
                      role="menuitem"
                    >
                      編集
                    </Link> */}
                    <button
                      onClick={() => {
                        clickDeleteButton();
                      }}
                      className="block w-full px-4 py-2 text-left text-sm text-red-700"
                      role="menuitem"
                    >
                      削除
                    </button>
                  </Dropdown>
                ) : null}
              </div>
              {record.image.url ? (
                <Image
                  src={record.image.url}
                  alt=""
                  width={450}
                  height={380}
                  className="mx-auto rounded-xl px-3"
                />
              ) : null}
              <div className="pb-3 pt-1">
                <div className="min-h-[80px]">
                  <div className="whitespace-pre-wrap p-1">{record.body}</div>
                </div>
              </div>
            </div>
            <div className="rounded-2xl bg-white p-3">
              <h3 className="border-b border-slate-400 text-lg">コメント</h3>
              <div>
                {commentItems.map((comment) => (
                  <div key={comment.id}>
                    <CommentCard
                      comment={comment}
                      commentItems={commentItems}
                      setCommentItems={setCommentItems}
                      type="record"
                    />
                  </div>
                ))}
              </div>
              <CommentForm data={record} setCommentItems={setCommentItems} type="record" />
            </div>
          </div>
        </div>
      </div>
      <Widgets data={related_records} type="show" />
    </div>
  );
};

export default Record;
