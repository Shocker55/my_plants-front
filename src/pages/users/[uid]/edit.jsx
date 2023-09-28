import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineUser, AiOutlineClose } from "react-icons/ai";

export const getServerSideProps = async (context) => {
  const uid = context.params.uid;
  const res = await axiosInstance.get(`/users/${uid}`);
  const user = await res.data;

  return { props: { user } };
};

const EditProfile = ({ user }) => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [name, setName] = useState(user.profile.name);
  const [avatar, setAvatar] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");
  const [bio, setBio] = useState(user.profile.bio);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const inputEl = useRef(null);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else if (currentUser.uid != user.uid) {
      router.push("/");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (currentUser && user.profile.avatar.url) {
      const fetchProfile = () => {
        axiosInstance.get(`/users/${currentUser.uid}`).catch((error) => {
          console.log(error);
        });
        fetch(user.profile.avatar.url)
          .then((res) => res.blob())
          .then(
            (blob) => new File([blob], `${user.profile.avatar.url.match(".+/(.+?)([?#;].*)?$")[1]}`)
          )
          .then((file) => {
            setAvatar(file);
            setAvatarPreview(window.URL.createObjectURL(file));
          });
      };
      fetchProfile();
    }
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
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    try {
      await axiosInstance.put(`/profiles/${user.id}`, data, config);
      router.push("/");
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <>
      {loading ? (
        <>Loading ...</>
      ) : (
        <div className="flex h-[800px] w-full items-center justify-center">
          <div className="w-[500px]">
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
                <div>
                  <button type="button" onClick={() => inputEl.current.click()}>
                    {avatarPreview ? (
                      <div>
                        <Image
                          src={avatarPreview}
                          width={96}
                          height={96}
                          alt=""
                          className="mr-3 rounded-full font-mono w-[96px] h-[96px]"
                        />
                      </div>
                    ) : (
                      <AiOutlineUser className="mr-3 rounded-full border bg-slate-200 p-2 font-mono text-8xl" />
                    )}
                  </button>
                  {avatarPreview ? (
                    <button
                      type="button"
                      onClick={() => {
                        setAvatar(null);
                        setAvatarPreview(null);
                      }}
                      className="block"
                    >
                      <div>
                        <AiOutlineClose className="rounded-xl bg-slate-200 p-[1.5px]" />
                      </div>
                    </button>
                  ) : null}
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
                <div>
                  <div>
                    <label htmlFor="name" className="block">
                      ユーザー名
                    </label>
                    <input
                      id="name"
                      name="name"
                      value={name}
                      placeholder="ユーザー名を入力"
                      onChange={(e) => setName(e.target.value)}
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
                      value={bio}
                      placeholder="Bio"
                      onChange={(e) => setBio(e.target.value)}
                      className="border"
                    />
                  </div>
                </div>
              </div>
              <div>
                <button className="rounded border bg-gray-300 px-3 hover:bg-gray-400">作成</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default EditProfile;
