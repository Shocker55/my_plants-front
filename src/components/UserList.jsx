import React from "react";
import UserCard from "./UserCard";

export default function UserList(users) {
  return (
    <>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div className="underline">All</div>
        <div className="text-slate-500">Following</div>
        <div className="text-slate-500">Followed</div>
      </div>
      <div className="flex flex-wrap sm:w-[450px] lg:w-[900px]">
        {users?.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </>
  );
}
