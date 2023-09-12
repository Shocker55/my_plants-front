import Image from "next/image";
import Link from "next/link";

export default function AttendeeCard({ user }) {
  return (
    <Link
      href={`/users/${user.uid}`}
      className="record-card-color mx-1 my-3 flex rounded-lg border border-slate-300"
    >
      <div className="flex items-center justify-center pr-2">
        {user.profile.avatar.url ? (
          <Image
            src={user.profile.avatar.url}
            alt=""
            width={80}
            height={80}
            className="h-auto rounded-full p-2"
          />
        ) : (
          <Image
            src="/images/photo_icon.png"
            alt=""
            width={80}
            height={80}
            className="h-auto rounded"
          />
        )}
      </div>
      <div className="max-w-[290px]">
        <div className="flex py-2">
          <div className="mr-3 pl-3">
            <h3 className="font-bold">{user.profile.name}</h3>
            <p className="mb-2 line-clamp-2 h-14 overflow-hidden py-2">{user.profile.bio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
