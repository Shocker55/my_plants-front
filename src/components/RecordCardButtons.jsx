import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaRegHeart, FaRegTrashCan, FaHeart, FaBookmark } from "react-icons/fa6";

export const RecordCardButtons = ({ record, recordsItems, setRecordsItems }) => {
  const { currentUser } = useAuthContext();
  const [likeCount, setLikeCount] = useState(record.record_likes.length);
  const router = useRouter();
  const [isCurrentUserLiked, setIsCurrentUserLiked] = useState(false);
  const [isCurrentUserBookmarked, setIsCurrentUserBookmarked] = useState(false);

  useEffect(() => {
    const currentUserLikedRecords = record.record_likes.filter((record) => {
      return record.user.uid === currentUser?.uid;
    });
    if (currentUserLikedRecords.length) {
      setIsCurrentUserLiked(true);
    }
  }, []);

  useEffect(() => {
    const currentUserBookmarkedRecords = record.record_bookmarks?.filter((record) => {
      return record.user.uid === currentUser?.uid;
    });
    if (currentUserBookmarkedRecords?.length) {
      setIsCurrentUserBookmarked(true);
    }
  }, []);

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

  const clickDeleteButton = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/records/${record.id}`, config);
      const filterRecords = recordsItems.filter((item) => item.id !== record.id);
      setRecordsItems((prev) => filterRecords);
      // router.reload()
    } catch (err) {
      alert("記録の削除に失敗しました");
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
    <>
      {currentUser && record.user.uid === currentUser.uid ? (
        <div className="flex h-full items-center justify-end">
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
          <p className="pr-2 text-slate-500">{likeCount}</p>
          <button
            onClick={() => {
              clickDeleteButton();
            }}
          >
            <FaRegTrashCan className="text-slate-500 sm:mr-3" />
          </button>
        </div>
      ) : (
        <div className="flex h-full items-center justify-end">
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
          <p className="pr-2 text-slate-500">{likeCount}</p>
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
      )}
    </>
  );
};
