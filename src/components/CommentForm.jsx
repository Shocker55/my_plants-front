import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";

export default function CommentForm({ data, setCommentItems }) {
  const router = useRouter();
  const { currentUser } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { comment } = e.target.elements;

    if (!currentUser) {
      return router.push("/login");
    }

    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.post(
        `/records/${data.id}/record_comments`,
        { comment: comment.value },
        config
      );
      const res = await axiosInstance.get(`/records/${data.id}`);
      setCommentItems(res.data.record_comments);
      comment.value = "";
    } catch (err) {
      alert("コメントの投稿に失敗しました");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-5">
      <div>
        <textarea
          name="comment"
          placeholder="コメントを入力"
          rows="3"
          maxLength="100"
          className="w-full"
        ></textarea>
      </div>
      <div>
        <button className="border bg-blue-300">投稿する</button>
      </div>
    </form>
  );
}
