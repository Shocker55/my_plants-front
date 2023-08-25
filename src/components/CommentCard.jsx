import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser, FaRegTrashCan } from "react-icons/fa6";

export const CommentCard = ({ comment, commentItems, setCommentItems }) => {
  const { currentUser } = useAuthContext();
  const date = new Date(comment.updated_at);

  const clickDeleteButton = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/record_comments/${comment.id}`, config);
      const filterComments = commentItems.filter((item) => item.id !== comment.id);
      setCommentItems((prev) => filterComments);
    } catch (err) {
      alert("いいねの取り消しに失敗しました");
    }
  };

  return (
    <div className="border-b p-5">
      <div className="flex justify-between">
        <div className="flex">
          <Link href={`/users/${comment.user.uid}`}>
            {comment.user.profile.avatar.url ? (
              <Image
                src={comment.user.profile.avatar.url}
                width={50}
                height={50}
                alt=""
                className="mr-2 h-auto rounded-full"
              />
            ) : (
              <FaCircleUser className="h-[60px] w-[60px] text-5xl text-gray-400" />
            )}
          </Link>
          <div className="my-auto">{comment.user.profile.name}</div>
        </div>
        <div className="flex">
          {currentUser && comment.user.uid === currentUser.uid ? (
            <button
              onClick={() => {
                clickDeleteButton();
              }}
              className="mr-3"
            >
              <FaRegTrashCan />
            </button>
          ) : null}
          <div className="my-auto text-sm text-slate-500">{date.toLocaleDateString()}</div>
        </div>
      </div>
      <div className="whitespace-pre-wrap pl-2 pt-3 text-sm">{comment.comment}</div>
    </div>
  );
};
