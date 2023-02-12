//type
import { song } from "../../../types/song";
//redux
import { dispatch, useSelector } from "../../../redux/store";
import { selectSong } from "../../../redux/slices/song";

function SongList() {
  const { songs, songSelected } = useSelector((state) => state.song);

  const handleSelectSong = (song: song) => {
    dispatch(selectSong(song));
  };

  return (
    <div className="h-[calc(100vh-224px)]  overflow-y-scroll">
      <table className="table-auto w-full relative">
        <thead className="text-left text-white bg-slate-700 sticky top-0">
          <tr>
            <th className="px-4 py-3 text-center w-[10px]">#</th>
            <th className="px-4 "> Title</th>
            <th className="px-4 w-[10px]">Author</th>
            <th className="px-4  text-center w-[10px]">
              <i className="bx bxs-download"></i>
            </th>
          </tr>
        </thead>
        <tbody className="bg-slate-800 text-gray-400 h-full">
          {songs.map((song: song, index: number) => (
            <tr
              className={`${
                song.id === songSelected?.id ? "active" : ""
              } hover:bg-slate-600 cursor-pointer`}
              key={song.id}
              onClick={() => handleSelectSong(song)}
            >
              <td className="px-4 py-3 text-center">{index + 1}</td>
              <td className="px-4 ">{song.name}</td>
              <td className="px-4 ">{song.author}</td>
              <td className="px-4  text-center">
                <a href={song.url}>
                  <i className="bx bxs-download"></i>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SongList;
