import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";

const CreateRecord = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState();
  const [preview, setPreview] = useState("");
  const [base, setBase] = useState(true);
  const [baseRecords, setBaseRecords] = useState([]);
  const [selectedBaseRecord, setSelectedBaseRecord] = useState("");
  const [baseId, setBaseId] = useState(0);
  const inputEl = useRef(null);

  useEffect(() => {
    const fetchBaseRecord = async () => {
      const result = await axiosInstance
        .get("/records", { params: { uid: `${currentUser.uid}`, base: "true" } })
        .then((res) => res.data);
      setBaseRecords(result);
    };
    fetchBaseRecord();
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

    try {
      await axiosInstance.post("/records", data, config);
      router.push("/records");
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

  return (
    <div className="mx-auto w-[1000px]">
      <h1>記録一覧画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/records" className="font-medium text-blue-600 hover:underline">
          記録一覧画面
        </Link>
      </div>

      <form onSubmit={handleSubmit}>
        <label>
          <h2>タイトルを入力してください</h2>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-[500px] border"
          />
        </label>
        <label>
          <h2>関連する記録</h2>
          <div>
            <select value={selectedBaseRecord} onChange={(e) => handleSelectedRecord(e)}>
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
          <h2>本文を入力してください</h2>
          <div>
            <textarea
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="h-[300px] w-[500px] border"
            />
          </div>
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
              <img className="h-[380px] w-[500px] rounded-xl" src={preview} alt="" />
            </div>
          ) : null}
        </div>
        <div className="my-5 flex">
          <div>
            <button
              type="button"
              onClick={() => inputEl.current.click()}
              className="ml-3 mr-10 rounded-md border bg-slate-200"
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
            <button type="submit" value="Submit" className="rounded-lg border bg-blue-300 px-2">
              記事を作成する
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreateRecord;
