import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { FaRegBookmark, FaRegHeart, FaRegTrashCan, FaHeart } from "react-icons/fa6";

export const RecordCardButtons = ({ record }) => {
  const { currentUser } = useAuthContext();
  const [likeCount, setLikeCount] = useState(record.record_likes.length);
  const router = useRouter();
  const [likeStatus, setLikeStatus] = useState(false);

  useEffect(() => {
    const liked = record.record_likes.filter((record) => {
      return record.user.uid === currentUser?.uid;
    });
    if (liked.length) {
      setLikeStatus(true);
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
      setLikeStatus(true);
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
      setLikeStatus(false);
    } catch (err) {
      alert("いいねの取り消しに失敗しました");
    }
  };

  return (
    <>
      {currentUser && record.user.uid === currentUser.uid ? (
        <div className="flex h-full items-center justify-end">
          {likeStatus === true ? (
            <button
              onClick={() => {
                clickUnLikeButton();
              }}
            >
              <FaHeart className="mr-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                clickLikeButton();
              }}
            >
              <FaRegHeart className="mr-1" />
            </button>
          )}
          <p className="pr-2">{likeCount}</p>
          <button>
            <FaRegTrashCan className="sm:mr-3" />
          </button>
        </div>
      ) : (
        <div className="flex h-full items-center justify-end">
          {likeStatus === true ? (
            <button
              onClick={() => {
                clickUnLikeButton();
              }}
            >
              <FaHeart className="mr-1" />
            </button>
          ) : (
            <button
              onClick={() => {
                clickLikeButton();
              }}
            >
              <FaRegHeart className="mr-1" />
            </button>
          )}
          <p className="pr-2">{likeCount}</p>
          <FaRegBookmark className="sm:mr-3" />
        </div>
      )}
    </>
  );
};