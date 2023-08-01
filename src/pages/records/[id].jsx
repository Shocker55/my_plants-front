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
        <h2>{record.title}</h2>
        <h3>本文</h3>
        <p>{record.contents}</p>
      </div>
    </div>
  );
};

export default Record;
