import Link from "next/link";

export async function getServerSideProps({ params }) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMEIN}/records/${params.id}`);
  const record = await res.json();

  if (record.status) {
    return {
      notFound: true,
    };
  }

  return { props: { record } };
}

const Record = ({ record }) => {
  return (
    <div className="mx-auto w-[1000px]">
      <h1>記録詳細画面</h1>
      <div>
        <Link href="/" className="font-medium text-blue-600 hover:underline">
          TOP
        </Link>
      </div>
      <div>
        <Link href="/create-record" className="font-medium text-blue-600 hover:underline">
          記録作成画面
        </Link>
      </div>
      <div>
        <h2 className="pb-2 text-lg font-semibold">{record.title}</h2>
        {record.image.url ? (
          <img src={record.image.url} alt="" className="h-[380px] w-[500px] rounded-xl" />
        ) : null}
        <h3>本文</h3>
        <p>{record.body}</p>
      </div>
    </div>
  );
};

export default Record;
