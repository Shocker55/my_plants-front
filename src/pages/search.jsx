import EventCard from "@/components/EventCard";
import Feed from "@/components/Feed";
import RecordCard from "@/components/RecordCard";
import Sidebar from "@/components/Sidebar";
import Widgets from "@/components/Widgets";
import { axiosInstance } from "@/utils/axios";
import { useRouter } from "next/router";
import React, { useEffect, useState, useRef } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

const Search = () => {
  const router = useRouter();
  const [searchedItems, setSearchedItems] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [searchType, setSearchType] = useState("tag");
  const [itemType, setItemType] = useState("records");
  const [loading, setLoading] = useState(false);
  const [isFocus, setIsFocus] = useState(false);
  const [options, setOptions] = useState([]);
  // フィルターにかけた配列をいれるためのステート
  const [suggestions, setSuggestions] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (router.query.q) {
      setLoading(true);
      setInputValue(router.query.q);
      setSearchType("tag");
      setItemType("records");
      const fetchData = async () => {
        const res = await axiosInstance.get(
          `${process.env.NEXT_PUBLIC_API_DOMEIN}/records/search?tag=${router.query.q}`
        );
        const items = await res.data;
        setSearchedItems(items);
        setLoading(false);
      };
      fetchData();
    }
  }, [router.query.q]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (inputRef.current && !inputRef.current.contains(event.target)) {
        setIsFocus(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsFocus(false);
    setLoading(true);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/${itemType}/search?${searchType}=${inputValue}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setLoading(false);
  };

  const handleClickTitle = async (e) => {
    setLoading(true);
    setSearchType(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/records/search?title=${inputValue}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setItemType("records");
    setLoading(false);
  };

  const handleClickBody = async (e) => {
    setLoading(true);
    setSearchType(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/records/search?body=${inputValue}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setItemType("records");
    setLoading(false);
  };

  const handleClickTag = async (e) => {
    setIsFocus(false);
    setLoading(true);
    setSearchType(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/records/search?tag=${inputValue}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setItemType("records");
    setLoading(false);
  };

  const handleClickEvent = async (e) => {
    setLoading(true);
    setSearchType(e.target.id);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/events/search?event=${inputValue}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setItemType("events");
    setLoading(false);
  };

  useEffect(() => {
    const fetchTags = async () => {
      const res = await axiosInstance.get(`${process.env.NEXT_PUBLIC_API_DOMEIN}/tags`);
      const tags = await res.data;

      setOptions(tags);
    };
    fetchTags();
  }, []);

  const handleChange = async (text) => {
    // 空の配列を用意
    let matches = [];
    // 入力する値が0文字より大きければ処理を行う
    if (text.length > 0) {
      matches = options.filter((opt) => {
        // new RegExp = パターンでテキストを検索するために使用
        const regex = new RegExp(`${text}`, "gi");
        return opt.name.match(regex);
      });
    }
    // フィルターをかけた配列をsuggestionsのステートに入れる
    setSuggestions(matches);
    setInputValue(text);
  };

  const handleClickSuggestion = async (e) => {
    e.stopPropagation();
    // textにフィルターをかけた入力候補の値を入れる
    setInputValue(e.target.textContent);
    setIsFocus(false);
    setLoading(true);
    const res = await axiosInstance.get(
      `${process.env.NEXT_PUBLIC_API_DOMEIN}/${itemType}/search?${searchType}=${e.target.textContent}`
    );
    const items = await res.data;
    setSearchedItems(items);
    setLoading(false);
  };
  return (
    <div className="flex h-screen justify-center">
      <Sidebar />
      <Feed pageTitle="Search">
        <form
          method="get"
          onSubmit={handleSubmit}
          className="relative mb-4 mt-3 flex items-center rounded-full p-3"
        >
          <button onClick={handleSubmit} className="z-10 h-5 text-gray-500 xl:ml-36">
            <FaMagnifyingGlass />
          </button>
          <input
            type="text"
            placeholder="Search"
            value={inputValue}
            onFocus={() => setIsFocus(true)}
            onChange={(e) => {
              handleChange(e.target.value);
            }}
            className="absolute inset-0 mx-auto rounded-full border-gray-500 bg-gray-100 pl-11 text-gray-700 focus:bg-white focus:shadow-lg sm:w-[418px] lg:w-[600px]"
          />
          {isFocus && searchType === "tag" ? (
            <>
              {suggestions.length > 0 ? (
                <>
                  <div className="absolute right-0 top-12 z-50 w-full" ref={inputRef}>
                    <div className="flex w-full justify-center px-8">
                      <div className="flex w-full flex-col rounded-md bg-white px-5 py-1 sm:w-[418px] lg:w-[600px]">
                        {suggestions.map((suggestion, i) => (
                          <div
                            key={i}
                            onClick={(e) => {
                              handleClickSuggestion(e);
                            }}
                            className="text-md border-b px-2 py-1 hover:cursor-pointer hover:bg-slate-300"
                          >
                            {suggestion.name}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  {inputValue ? (
                    <></>
                  ) : (
                    <>
                      <div className="absolute right-0 top-12 z-50 w-full" ref={inputRef}>
                        <div className="flex w-full justify-center px-8">
                          <div className="flex w-full flex-col rounded-md bg-white px-5 py-1 sm:w-[418px] lg:w-[600px]">
                            <p>人気のタグ</p>
                            {options.slice(0, 5).map((option, i) => (
                              <div
                                key={i}
                                onClick={(e) => {
                                  handleClickSuaggestion(e);
                                }}
                                className="text-md border-b px-2 py-1 hover:cursor-pointer hover:bg-slate-300"
                              >
                                {option.name}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </>
                  )}
                </>
              )}
            </>
          ) : (
            <></>
          )}
        </form>
        <div className="mb-3 ml-1 font-bold">Records</div>
        <div className="mb-1 ml-4 flex max-w-[450px] space-x-10">
          <div
            id="tag"
            className={
              searchType == "tag" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
            }
            onClick={(e) => handleClickTag(e)}
          >
            タグ
          </div>
          <div
            id="title"
            className={
              searchType === "title" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
            }
            onClick={(e) => handleClickTitle(e)}
          >
            タイトル
          </div>
          <div
            id="body"
            className={
              searchType == "body" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
            }
            onClick={(e) => handleClickBody(e)}
          >
            本文
          </div>
          <div
            id="event"
            className={
              searchType == "event" ? "cursor-pointer underline" : "cursor-pointer text-slate-500"
            }
            onClick={(e) => handleClickEvent(e)}
          >
            イベント
          </div>
        </div>
        <div className="mb-20 grid grid-cols-1 place-items-center gap-1 sm:min-w-[450px] lg:w-[900px] lg:grid-cols-2">
          {loading ? (
            <div role="status" className="mx-auto mt-20">
              <svg
                aria-hidden="true"
                className="mr-2 h-8 w-8 animate-spin fill-blue-600 text-gray-200 dark:text-gray-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : (
            <>
              {searchedItems && searchedItems?.length !== 0 ? (
                <>
                  {" "}
                  {searchType === "tag" || searchType === "title" || searchType === "body"
                    ? searchedItems?.map((record) => {
                        return <RecordCard key={record.id} record={record} />;
                      })
                    : null}
                  {searchType === "event"
                    ? searchedItems?.map((event) => {
                        return <EventCard key={event.id} event={event} />;
                      })
                    : null}
                </>
              ) : (
                <div>みつかりませんでした</div>
              )}
            </>
          )}
        </div>
      </Feed>
      <Widgets />
    </div>
  );
};

export default Search;
