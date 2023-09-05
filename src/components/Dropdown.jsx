import { useAuthContext } from "@/context/AuthContext";
import { axiosInstance } from "@/utils/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

export default function Dropdown({ event }) {
  const { currentUser } = useAuthContext();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleOutsideClick = (e) => {
    console.log(e);
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  const clickDeleteButton = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${currentUser.stsTokenManager.accessToken}`,
      },
    };

    try {
      await axiosInstance.delete(`/events/${event.id}`, config);
      // const filterRecords = recordsItems.filter((item) => item.id !== record.id);
      // setRecordsItems((prev) => filterRecords);
      router.push("/events");
    } catch (err) {
      alert("イベントの削除に失敗しました");
    }
  };
  return (
    <>
      {currentUser && event.user.uid === currentUser.uid ? (
        <div class="relative inline-block text-left">
          {console.log(event)}
          <div>
            <button
              onClick={() => setIsOpen(!isOpen)}
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded={isOpen}
              aria-haspopup="true"
            >
              <FaEllipsis />
            </button>
          </div>
          {isOpen && (
            <div
              className="absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
              role="menu"
              aria-orientation="vertical"
              aria-labelledby="menu-button"
            >
              <div className="py-1" role="none">
                <Link
                  href={`/events/${event.id}/edit`}
                  className="block px-4 py-2 text-sm text-gray-700"
                  role="menuitem"
                >
                  編集
                </Link>
                <button
                  onClick={() => {
                    clickDeleteButton();
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-red-700"
                  role="menuitem"
                >
                  削除
                </button>
              </div>
            </div>
          )}
        </div>
      ) : null}
    </>
  );
}
