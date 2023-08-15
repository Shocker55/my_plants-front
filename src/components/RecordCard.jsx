import { FaArrowUpFromBracket, FaCircleUser, FaRegHeart } from "react-icons/fa6";

export default function RecordCard() {
  return (
    <div className="record-card-color mx-1 my-3 flex w-[440px] justify-between rounded-lg border border-slate-300">
      <div className="w-[290px]">
        <div className="flex py-2">
          <div className="mr-3 pl-2">
            <h3 className="truncate font-bold">TiTle</h3>
            <p className="mb-2 line-clamp-2 h-14 overflow-hidden py-2">
              長文になったら折り返してほしんだけどなぜかうまくいかないなああああああああああああああああああああああああああああaaaaaaaaaaaaaaa
            </p>
          </div>
        </div>
        <div className="flex items-center justify-between px-2 py-1">
          <div className="flex items-center">
            <FaCircleUser className="text-5xl text-gray-400" />
            <div className="px-2 text-sm font-semibold text-gray-500">usename</div>
          </div>
          <div className="flex">
            <FaRegHeart className="mr-3" />
            <FaArrowUpFromBracket />
          </div>
        </div>
      </div>
      <div>
        <img
          className="my-2 h-[150px] w-[150px] rounded-2xl pr-2"
          src={"https://source.unsplash.com/random"}
        />
      </div>
    </div>
  );
}
