import Feed from "@/components/Feed";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CreateRecord = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [base, setBase] = useState(true);
  const [baseRecords, setBaseRecords] = useState([]);
  const [selectedBaseRecord, setSelectedBaseRecord] = useState("");
  const [baseId, setBaseId] = useState(0);
  const inputEl = useRef(null);
  const [error, setError] = useState(null);
  const [recordsItems, setRecordsItems] = useState([]);
  const [active, setActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(true);

  useEffect(() => {
    if (!currentUser) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get(`/users/${currentUser.uid}`);
        if (res.data.profile) {
          setProfile(false);
        } else {
          router.push("/profiles/create");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchBaseRecord = async () => {
      try {
        const res = await axiosInstance.get("/records", {
          params: { uid: `${currentUser.uid}`, base: "true" },
        });
        const baseRecordsData = await res.data;
        setBaseRecords(baseRecordsData);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchBaseRecord();
    }
  }, []);

  useEffect(() => {
    const fetchUserRecords = async () => {
      try {
        const res = await axiosInstance.get(`/records?q=own&uid=${currentUser.uid}`);
        const recordsData = await res.data;
        setRecordsItems(recordsData);
      } catch (error) {
        console.log(error);
      }
    };
    if (currentUser) {
      fetchUserRecords();
    }
  }, []);

  const handleSelectedRecord = (e) => {
    setSelectedBaseRecord(e.target.value);
    if (!!e.target.value) {
      setBase(false);
      setBaseId(e.target.value);
    } else {
      setBase(true);
      setBaseId(0);
    }
  };

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const file = files[0];
      const fileSize = file.size;
      // 画像のサイズを5MB以下に制限
      if (fileSize / 1024 ** 2 <= 5) {
        setImage(file);
        setPreview(window.URL.createObjectURL(file));
      } else {
        alert("最大サイズは5MBです");
        setImage(null);
        setPreview(null);
      }
    } else {
      setImage(null);
    }
  };

  // FormData形式でデータを作成
  const createFormData = () => {
    const formData = new FormData();

    formData.append("title", title);
    if (body) formData.append("body", body);
    if (image) formData.append("image", image);
    formData.append("tags", tags);
    formData.append("base", base);
    formData.append("baseId", baseId);

    return formData;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = createFormData();
    // データの内容を確認したい場合 console.log(...data.entries());
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
        "Content-Type": "multipart/form-data",
      },
    };

    if (active === true) {
      try {
        setActive(false);
        await axiosInstance.post("/records", data, config);
        router.push(`/users/${currentUser.uid}`);
      } catch (error) {
        setError(error.response.data.message);
        setActive(true);
      }
    }
  };

  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="記録の作成">
        <div className="h-custom3 flex justify-center py-6 sm:min-w-[500px] lg:w-[900px]">
          {loading && profile ? (
            <>Loading...</>
          ) : (
            <div className="record-card-color hidden-scrollbar w-[500px] overflow-y-scroll rounded-xl px-5 py-8 text-slate-800">
              <form onSubmit={handleSubmit}>
                {error ? (
                  <div className="mb-2">
                    {Object.values(error).map((_error, index) => {
                      return (
                        <div key={index} className="flex">
                          <div className="text-slate-400">・</div>
                          <h2 className="text-red-300">{_error}</h2>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                <label>
                  <h2 className="pb-1">タイトルを入力してください</h2>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="mb-3 w-full border"
                  />
                </label>
                <label>
                  <h2 className="pb-1">関連する記録</h2>
                  <div>
                    <select
                      value={selectedBaseRecord}
                      onChange={(e) => handleSelectedRecord(e)}
                      className="mb-3 min-w-[180px] max-w-full"
                    >
                      <option value="">なし</option>
                      {baseRecords.map((baseRecord) => {
                        return (
                          <option key={baseRecord.id} value={baseRecord.id}>
                            タイトル: {baseRecord.title}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                </label>
                <label>
                  <h2 className="pb-2">本文を入力してください</h2>
                  <div>
                    <textarea
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      className="mb-3 h-[300px] w-full border"
                    />
                  </div>
                </label>
                <label>
                  <h2 className="pb-2">タグを入力してください (一つのタグは最大10文字)</h2>
                  <input
                    value={tags}
                    onChange={(e) => setTags(e.target.value)}
                    placeholder=",で区切って入力してください"
                    className="mb-3 w-full border"
                  />
                </label>
                <div>
                  {preview ? (
                    <div>
                      <button
                        type="button"
                        onClick={() => {
                          setImage(null);
                          setPreview(null);
                        }}
                      >
                        <div>
                          <AiOutlineClose className="rounded-xl bg-slate-200 p-[1.5px]" />
                        </div>
                      </button>
                      <Image
                        width={450}
                        height={380}
                        className="rounded-xl px-3"
                        src={preview}
                        alt=""
                      />
                    </div>
                  ) : null}
                </div>
                <div className="my-8 flex justify-center">
                  <div className="">
                    <button
                      type="button"
                      onClick={() => inputEl.current.click()}
                      className="ml-3 mr-10 rounded-lg border bg-blue-400 px-2 py-1 text-white hover:bg-blue-500 active:bg-blue-700"
                    >
                      画像を選択
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
                  <div>
                    <button
                      type="submit"
                      value="Submit"
                      className="rounded-lg border bg-slate-400 px-2 py-1 text-white hover:bg-slate-500"
                    >
                      作成する
                    </button>
                  </div>
                </div>
              </form>
            </div>
          )}
        </div>
      </Feed>
      <Widgets data={recordsItems} type="index" />
    </div>
  );
};

export default CreateRecord;
