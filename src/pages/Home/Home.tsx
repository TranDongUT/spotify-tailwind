//components
import SongDetail from "./components/SongDetail";
import SongList from "./components/SongList";

function Home() {
  return (
    <div className="grid sm:grid-cols-3 ssm:grid-cols-1">
      <div className="col-span-1 ">
        <SongDetail />
      </div>
      <div className="col-span-2 ">
        <SongList />
      </div>
    </div>
  );
}

export default Home;
