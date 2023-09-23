import { CommentCard } from "@/components/CommentCard";
import CommentForm from "@/components/CommentForm";
import Dropdown from "@/components/Dropdown";
import Feed from "@/components/Feed";
import Footer from "@/components/Footer";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { FaBookmark, FaHeart, FaRegBookmark, FaRegHeart } from "react-icons/fa6";

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
  const [commentItems, setCommentItems] = useState([...record.record_comments]);
  const [isCurrentUserBookmarked, setIsCurrentUserBookmarked] = useState(false);
  const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(record.record_likes.length);

  const updatedDate = new Date(record.updated_at);

  useEffect(() => {
    const currentUserLikedRecords = record.record_likes.filter((record) => {
      return record.user.uid === currentUser?.uid;
    });
    if (currentUserLikedRecords.length) {
      setIsCurrentUserLiked(true);
    }
  }, []);

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

  const clickLikeButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.post("/record_likes", { record_id: record.id }, config);
      setLikeCount((prev) => prev + 1);
      setIsCurrentUserLiked(true);
    } catch (err) {
      alert("いいねに失敗しました");
    }
  };

  const clickUnLikeButton = async () => {
    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/record_likes/${record.id}`, config);
      setLikeCount((prev) => prev - 1);
      setIsCurrentUserLiked(false);
    } catch (err) {
      alert("いいねの取り消しに失敗しました");
    }
  };

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
      <Feed pageTitle="記録詳細">
        <div className="flex h-[180px] justify-center sm:min-w-[450px] lg:w-[900px]">
          <div className="mx-1 h-[180px] w-[450px] lg:w-[844px] ">
            <div className="my-2 flex rounded-lg border bg-blue-200 py-3 lg:w-[844px]">
              <div>
                <Link href={`/users/${record.user.uid}`}>
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
                </Link>
              </div>
              <div className="pl-3">
                <div className="font-bold">{record.user.profile.name}</div>
                <div>{record.user.profile.bio}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center px-1 sm:min-w-[450px] lg:w-[900px]">
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
              <div className="flex items-end justify-end p-1">
                <div className="mr-4 flex">
                  {currentUser ? (
                    <>
                      {isCurrentUserLiked === true ? (
                        <button
                          onClick={() => {
                            clickUnLikeButton();
                          }}
                        >
                          <FaHeart className="mr-1 text-pink-300" />
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            clickLikeButton();
                          }}
                        >
                          <FaRegHeart className="mr-1 text-slate-500" />
                        </button>
                      )}
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => {
                          clickLikeButton();
                        }}
                      >
                        <FaRegHeart className="mr-1 text-slate-500" />
                      </button>
                    </>
                  )}
                  <p className="pr-2 text-slate-500">{likeCount}</p>
                  {/* <FaRegCalendarCheck className="my-auto mr-1 text-lg" />
                  {attendeesCount ? <>参加予定: {attendeesCount}名</> : "0"} */}
                </div>
                <div className="pr-1 text-sm text-slate-500">
                  {updatedDate.toLocaleDateString()}
                </div>
              </div>
            </div>
            <div className="mb-20 rounded-2xl bg-white p-3">
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
      </Feed>
      <Widgets data={related_records} type="show" />
    </div>
  );
};

export default Record;
