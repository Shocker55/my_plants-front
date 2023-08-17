import Image from "next/image";
import Link from "next/link";
import { AiOutlinePicture } from "react-icons/ai";

export async function getServerSideProps() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records`);
  const records = await res.json();

  return { props: { records } };
}

const Records = ({ records }) => {
  const handleDelete = () => {};

  return (
    <div className="mx-auto w-[1000px]">
      <h1>記録一覧画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/create-record" className="font-medium text-blue-600 hover:underline">
          記事作成画面
        </Link>
      </div>
      <div>
        <ul>
          {records?.map((record) => (
            <div key={record.id} className="flex border">
              <Link href={`/records/${record.id}`}>
                <li className="m-1 flex p-3 font-medium text-blue-600 hover:underline ">
                  {record.image.url ? (
                    <Image
                      src={record.image.url}
                      alt=""
                      width={50}
                      height={50}
                      className="mr-3 h-auto w-auto rounded"
                    />
                  ) : (
                    <AiOutlinePicture className="mr-3 w-[50px] text-4xl" />
                  )}
                  {record.title}
                </li>
              </Link>
              <div>
                <button onClick={handleDelete} className="border bg-red-300 mt-4">
                  削除
                </button>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Records;
