import React, { useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

export default function SidebarDropdown(props) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef();

  // ドキュメント全体でのクリックを監視。どこかをクリックしたときに handleOutsideClick が呼び出される。
  // document.removeEventListener は、コンポーネントがアンマウントされたときにクリーンアップのために呼び出される。これにより、不要になったイベントリスナーが削除される。
  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  // クリックされた要素が dropdownRef.current（ドロップダウン内の要素）に含まれていない場合に、setIsOpen(false) を呼び出してドロップダウンを閉じる。
  const handleOutsideClick = (e) => {
    if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
      setIsOpen(false);
    }
  };

  return (
    <div ref={dropdownRef} className="relative inline-block w-full text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="flex w-full cursor-pointer items-center justify-center space-x-3 rounded  py-3 text-lg transition duration-150 ease-out hover:bg-slate-200 xl:justify-start"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaEllipsis className="ml-1 h-7" />
          <span className="hidden text-lg xl:inline">もっと</span>
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute bottom-10 left-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
        >
          <div className="py-1" role="none">
            {props.children}
          </div>
        </div>
      )}
    </div>
  );
}
