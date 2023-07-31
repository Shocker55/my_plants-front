import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateProfile = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const uid = currentUser.uid;
    const config = {
      headers: { authorization: `Bearer ${currentUser.stsTokenManager.accessToken}` },
    };

    try {
      await axiosInstance.post("/users", { name, avatar, bio, uid }, config).then(() => {
        router.push("/");
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex h-[800px] w-full items-center justify-center">
      <div className="w-[500px]">
        <h1>プロフィール作成</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">ユーザー名</label>
            <input
              id="name"
              name="name"
              placeholder="ユーザー名を入力"
              onChange={(e) => setName(e.target.value)}
              className="border"
            />
          </div>
          <div>
            <label htmlFor="avatar">アバター画像</label>
            <input
              id="avatar"
              name="avatar"
              placeholder="アバターを選択"
              onChange={(e) => setAvatar(e.target.value)}
              className="border"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block">
              ひとこと
            </label>
            <textarea
              id="bio"
              name="bio"
              type="text"
              placeholder="Bio"
              onChange={(e) => setBio(e.target.value)}
              className="border"
            />
          </div>
          <div>
            <button className="rounded border bg-gray-300 px-3 hover:bg-gray-400">作成</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
