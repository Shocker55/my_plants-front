import React, { useEffect, useRef, useState } from "react";
import { FaEllipsis } from "react-icons/fa6";

export default function FooterDropdown(props) {
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
    <div ref={dropdownRef} className="relative inline-block text-left">
      <div>
        <button
          onClick={() => setIsOpen(!isOpen)}
          type="button"
          className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-slate-50 px-3 py-2 text-sm font-semibold text-gray-900   hover:bg-gray-50"
          id="menu-button"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <FaEllipsis />
        </button>
      </div>
      {isOpen && (
        <div
          className="absolute right-0 bottom-10 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
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
