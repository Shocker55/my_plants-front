import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const CreateProfile = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [name, setName] = useState("");
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState(null);
  const inputEl = useRef(null);

  useEffect(() => {
    const fetchProfile = async () => {
      if (currentUser) {
        try {
          const res = await axiosInstance.get(`/users/${currentUser.uid}`);
          if (res.data.profile) {
            router.push("/");
          }
        } catch (error) {
          console.error(error);
        }
      }
    };
    fetchProfile();
  }, []);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileSize = file.size;
      // 画像のサイズを5MB以下に制限
      if (fileSize / 1024 ** 2 <= 5) {
        setAvatar(file);
        setAvatarPreview(window.URL.createObjectURL(file));
      } else {
        alert("最大サイズは5MBです");
        setAvatar(null);
        setAvatarPreview(null);
      }
    } else {
      setAvatar(null);
    }
  };

  // FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData();

    formData.append("name", name);
    formData.append("bio", bio);
    formData.append("avatar", avatar);

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = createFormData();
    // console.log(...data.entries());
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axiosInstance.post(`/profiles`, data, config);
      router.push(`/users/${currentUser.uid}`);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-3">
      <div className="w-[500px] items-center">
        <h1 className="mb-2 text-2xl">プロフィール作成</h1>
        {error ? (
          <div className="mb-2 border border-red-300">
            {/* エラーデータが配列ではなくオブジェクト型なの書き方が普段と異なる */}
            {Object.values(error).map((_error, index) => {
              return (
                <div key={index}>
                  <h2>{_error}</h2>
                </div>
              );
            })}
          </div>
        ) : null}
        <form onSubmit={handleSubmit}>
          <div className="flex">
            <div className="flex content-center">
              <button type="button" onClick={() => inputEl.current.click()}>
                {avatarPreview ? (
                  <div className="relative">
                    <Image
                      src={avatarPreview}
                      width={96}
                      height={96}
                      alt=""
                      className="mr-3 h-[96px] w-[96px] rounded-full font-mono"
                    />
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setAvatar(null);
                        setAvatarPreview(null);
                      }}
                      className="z-5 absolute right-5 top-0"
                    >
                      <AiOutlineClose className="rounded-xl bg-slate-300 p-1 text-xl" />
                    </button>
                  </div>
                ) : (
                  <div className="relative mr-3 flex h-[96px] w-[96px] items-center justify-center rounded-full border bg-slate-200 p-1 font-mono text-6xl">
                    <AiOutlinePlus className="z-5 absolute right-2 top-0 rounded-full bg-slate-300 p-1 text-xl" />
                    <AiOutlineUser className="z-0" />
                  </div>
                )}
              </button>
              <input
                ref={inputEl}
                type="file"
                accept="image/jpg,image/jpeg, image/png, image/gif"
                // 画像のプレビューを削除後、再度同じ選択するとonChangeイベントが発火しないためonClickイベントを追加
                onClick={(e) => {
                  e.target.value = "";
                }}
                onChange={(e) => {
                  handleFileChange(e);
                }}
                hidden
              />
            </div>
            <div className="ml-3 w-full max-w-[240px]">
              <div className="mb-2">
                <label htmlFor="name" className="block pb-2">
                  ユーザー名
                </label>
                <input
                  id="name"
                  name="name"
                  placeholder="ユーザー名を入力"
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border"
                />
              </div>
              <div className="mb-2">
                <label htmlFor="bio" className="block pb-2">
                  ひとこと
                </label>
                <textarea
                  id="bio"
                  name="bio"
                  type="text"
                  placeholder="Bio"
                  onChange={(e) => setBio(e.target.value)}
                  className="h-20 w-full border"
                />
              </div>
            </div>
          </div>
          <div className="flex max-w-[350px] justify-end">
            <button className="rounded border bg-gray-300 px-3 hover:bg-gray-400">作成</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateProfile;
