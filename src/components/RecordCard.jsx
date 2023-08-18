import Image from "next/image";
import Link from "next/link";
import { FaArrowUpFromBracket, FaCircleUser, FaRegHeart } from "react-icons/fa6";

export default function RecordCard({ record, userPage }) {
  return (
    <div className="record-card-color mx-1 my-3 flex w-[440px] justify-between rounded-lg border border-slate-300">
      <div className="w-[290px]">
        <div className="flex py-2">
          <Link href={`/records/${record.id}`}>
            <div className="mr-3 pl-3">
              <h3 className="truncate font-bold">{record.title}</h3>
              <p className="mb-2 line-clamp-2 h-14 overflow-hidden py-2">{record.body}</p>
            </div>
          </Link>
        </div>
        {!userPage ? (
          <div className="flex items-center justify-between px-2 py-1">
            <Link href={`/users/${record.user.uid}`}>
              <div className="flex items-center">
                {record.user.profile.avatar.url ? (
                  <Image
                    src={record.user.profile.avatar.url}
                    width={70}
                    height={70}
                    alt=""
                    className="mr-3 h-auto rounded-full"
                  />
                ) : (
                  <FaCircleUser className="ml-2 mr-3 h-[70px] w-[60px] text-5xl text-gray-400" />
                )}
                <div className="px-2 text-sm font-semibold text-gray-500">
                  {record.user.profile.name}
                </div>
              </div>
            </Link>
            <div className="flex">
              <FaRegHeart className="mr-3" />
              <FaArrowUpFromBracket />
            </div>
          </div>
        ) : (
          <div className="h-[56px]"></div>
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
              className="h-auto w-[150px] rounded"
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
