import React from "react";
import UserCard from "./UserCard";

export default function UserList({ users }) {
  return (
    <>
      <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
        <div className="underline">All</div>
        <div className="text-slate-500">Following</div>
        <div className="text-slate-500">Followed</div>
      </div>
      <div className="mb-20 grid grid-cols-1 place-items-center gap-1 sm:min-w-[450px] lg:w-[900px] lg:grid-cols-2">
        {users?.map((user) => {
          return <UserCard key={user.id} user={user} />;
        })}
      </div>
    </>
  );
}
