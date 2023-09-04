import Link from "next/link";

export default function EventCard({ event }) {
  const updatedDate = new Date(event.updated_at);
  const date = new Date(event.start_date);

  let formattedDate = "";
  if (event.date_type === "date_only") {
    // 年、月、日を取得
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    const day = date.getDate();

    // 出力用の文字列を生成
    formattedDate = `${year}年${month.toString().padStart(2, "0")}月${day
      .toString()
      .padStart(2, "0")}日`;
  } else {
    const year = date.getFullYear();
    const month = date.getMonth() + 1; // 月は0から始まるため、+1する
    formattedDate = `${year}年${month.toString().padStart(2, "0")}月`;
  }

  return (
    <div className="record-card-color mx-1 my-3 flex w-[440px] justify-between rounded-lg border border-slate-300">
      <div className="w-full">
        <div className="flex pt-2">
          <Link href={`/events/${event.id}`} className="w-full">
            <div className="mr-3 pl-3">
              <h3 className="truncate font-bold">{event.title}</h3>
              <p>日時： {formattedDate}</p>
              <p>場所： {event.place}</p>
              <p className="mb-2 line-clamp-3 h-20 overflow-hidden py-2">{event.body}</p>
              <p className="pr-1 text-right text-sm text-slate-500">
                {updatedDate.toLocaleDateString()}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
