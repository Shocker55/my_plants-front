import Image from "next/image";
import Dropdown from "./Dropdown";
import { useAuthContext } from "@/context/AuthContext";
import Link from "next/link";
import Footer from "./Footer";
import Slider from "./Slider";

export default function Feed({ pageTitle, children, user }) {
  const { currentUser } = useAuthContext();

  return (
    <div className="hidden-scrollbar max-w-xl flex-grow overflow-y-scroll border-l border-r border-gray-200 bg-slate-200 sm:ml-[10px] lg:min-w-[900px]">
      {/* Header */}
      <div className="sticky top-0 z-50 flex rounded border-b border-gray-200 bg-slate-50 px-3 py-5">
        <h2 className="text-xl font-bold">{pageTitle}</h2>
      </div>

      {/* Slider */}
      {pageTitle === "Home" ? <Slider /> : null}

      {pageTitle === "ユーザー" ? (
        <div className="flex h-[180px] justify-center sm:min-w-[450px] lg:w-[900px]">
          <div className="mx-1 h-[180px] w-[450px] lg:w-[844px] ">
            <div className="my-2 flex rounded-lg border bg-blue-200 py-3 lg:w-[844px]">
              <div>
                {user.profile?.avatar.url ? (
                  <Image
                    src={user.profile.avatar.url}
                    alt=""
                    width={130}
                    height={130}
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
              <div className="w-[90%] px-3">
                <div className="flex justify-between">
                  <div className="font-bold">{user.profile?.name}</div>
                  {currentUser && user.uid === currentUser.uid ? (
                    <Dropdown>
                      <Link
                        href={`/users/${currentUser.uid}/edit`}
                        className="block px-4 py-2 text-sm text-gray-700"
                      >
                        編集
                      </Link>
                    </Dropdown>
                  ) : null}
                </div>
                <div>{user.profile?.bio}</div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* List */}
      {children}

      <Footer />
    </div>
  );
}
