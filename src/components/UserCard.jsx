import Image from "next/image";
import Link from "next/link";

export default function UserCard({ user }) {
  return (
    <Link
      href={`/users/${user.uid}`}
      className="record-card-color w-custom mx-1 my-3 flex max-w-[440px] rounded-lg border border-slate-300"
    >
      <div className="flex items-center justify-center pr-2">
        {user.profile?.avatar.url ? (
          <Image
            src={user.profile.avatar.url}
            alt=""
            width={120}
            height={120}
            className="h-[120px] w-[120px] rounded-full p-2"
          />
        ) : (
          <Image
            src="/images/photo_icon.png"
            alt=""
            width={150}
            height={150}
            className="h-[120px] w-[120px] rounded"
          />
        )}
      </div>
      <div className="max-w-[290px]">
        <div className="flex py-2">
          <div className="mr-3 pl-3">
            <h3 className="font-bold">{user.profile?.name}</h3>
            <p className="mb-2 line-clamp-2 h-14 overflow-hidden py-2">{user.profile?.bio}</p>
          </div>
        </div>
      </div>
    </Link>
  );
}
