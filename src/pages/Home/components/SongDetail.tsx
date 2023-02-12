import { useSelector } from "../../../redux/store";

function SongDetail() {
  const { songSelected, isLoading, songs } = useSelector((state) => state.song);
  return (
    <div className="p-3 bg-slate-700 h-full">
      <h2 className="text-sky-400 font-semibold">Now playing</h2>
      <h1 className="text-2xl text-gray-400">
        {songSelected?.name || "UNKNOW"}{" "}
      </h1>
      <div className="mx-auto w-64 mt-16">
        <img
          className="sm:w-64 sm:h-64 mx-auto object-cover ssm:w-32 ssm:h-32"
          src={
            songSelected?.links?.images[0].url ??
            "https://i.scdn.co/image/ab6761610000e5ebc02d416c309a68b04dc94576"
          }
          alt="thumnail"
        />
        <div className="flex items-center justify-between mt-4">
          <img
            className="rounded-full w-16 h-16 animate-spin-slow"
            src={
              songSelected?.links?.images[1].url ??
              "https://i.scdn.co/image/ab67616d0000b273a108e07c661f9fc54de9c43a"
            }
            alt="author"
          />
          <h2 className="text-white text-lg">
            {songSelected?.author || "Unknow"}
          </h2>
        </div>
      </div>
    </div>
  );
}

export default SongDetail;
