import Image from "next/image";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { RecordCardButtons } from "./RecordCardButtons";

export default function RecordCard({ record, userPage, recordsItems, setRecordsItems }) {
  const date = new Date(record.created_at);

  return (
    <div className="record-card-color mx-1 my-3 flex max-w-[440px] justify-between rounded-lg border border-slate-300">
      <div className="w-[290px]">
        <div className="pt-2">
          <Link href={`/records/${record.id}`} className="w-full">
            <div className="mr-3 pl-3">
              <h3 className="truncate font-bold">{record.title}</h3>
              <p className="mb-2 line-clamp-2 h-14 overflow-hidden py-2">{record.body}</p>
            </div>
          </Link>
          <div className="mr-3 pl-3">
            <div className="mb-2 flex h-[20px] space-x-2">
              {record.tags &&
                record.tags.map((tag) => (
                  <Link
                    href={`/search?q=${tag.name}`}
                    key={tag.id}
                    className="rounded-lg bg-slate-200 px-1 text-sm"
                  >
                    {tag.name}
                  </Link>
                ))}
            </div>
          </div>
          <p className="pr-3 text-right text-sm text-slate-500">{date.toLocaleDateString()}</p>
        </div>
        {!userPage ? (
          <div className="flex items-center justify-between px-2 pb-1">
            <Link href={`/users/${record.user.uid}`}>
              <div className="flex items-center">
                {record.user.profile.avatar.url ? (
                  <Image
                    src={record.user.profile.avatar.url}
                    width={60}
                    height={60}
                    alt=""
                    className="mr-2 h-auto rounded-full"
                  />
                ) : (
                  <FaCircleUser className="mr-2 h-[60px] w-[60px] p-1 text-5xl text-gray-400" />
                )}
                <div className="text-sm font-semibold text-gray-500">
                  {record.user.profile.name}
                </div>
              </div>
            </Link>
            <RecordCardButtons
              record={record}
              recordsItems={recordsItems}
              setRecordsItems={setRecordsItems}
            />
          </div>
        ) : (
          <div className="h-[60px] px-2">
            <RecordCardButtons
              record={record}
              recordsItems={recordsItems}
              setRecordsItems={setRecordsItems}
            />
          </div>
        )}
      </div>
      <div className="flex items-center justify-center pr-2">
        <Link href={`/records/${record.id}`}>
          {record.image.url ? (
            <Image
              src={record.image.url}
              alt=""
              width={150}
              height={150}
              className="h-[150px] w-[150px] rounded"
            />
          ) : (
            <Image
              src="/images/photo_icon.png"
              alt=""
              width={120}
              height={120}
              className="h-auto w-[150px] rounded p-8"
            />
          )}
        </Link>
      </div>
    </div>
  );
}
