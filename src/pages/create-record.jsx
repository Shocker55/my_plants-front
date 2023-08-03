import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const CreateRecord = () => {
  const router = useRouter();
  const { currentUser } = useAuthContext();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [base, setBase] = useState(true);
  const [baseRecords, setBaseRecords] = useState([]);
  const [selectedBaseRecord, setSelectedBaseRecord] = useState("");
  const [baseId, setBaseId] = useState(0);

  useEffect(() => {
    const fetchBaseRecord = async () => {
      let result = await axiosInstance
        .get("/records", { params: { uid: `${currentUser.uid}`, base: "true" } })
        .then((res) => res.data);
      setBaseRecords(result);
    };
    fetchBaseRecord();
  }, []);

  const onClick = async () => {
    const config = {
      headers: { authorization: `Bearer ${currentUser.stsTokenManager.accessToken}` },
    };
    try {
      await axiosInstance.post("/records", { title, body, image, base, baseId }, config);
      router.push("/records");
    } catch (err) {
      alert("投稿に失敗しました");
    }
  };

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
      <h2>タイトルを入力してください</h2>
      <div>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-[500px] border"
        />
      </div>

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
      <h2>本文を入力してください</h2>
      <div>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="h-[300px] w-[500px] border"
        />
      </div>
      <h2>imageを選択してください</h2>
      <div>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          className="w-[500px] border"
        />
      </div>
      <div className="mt-5">
        <button onClick={onClick} className="border bg-blue-300">
          記録を作成する
        </button>
      </div>
    </div>
  );
};

export default CreateRecord;
