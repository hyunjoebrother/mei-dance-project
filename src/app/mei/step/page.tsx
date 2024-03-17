import React from "react";
import "../../globals.css";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const getArtistData = async () => {
  const artists = await pb.collection("artists").getList();
  return artists?.items as any[];
};

const getReelsData = async () => {
  const reels = await pb.collection("reels").getList();
  return reels?.items as any[];
};

const App: React.FC = async () => {
  const fetchArtistData = await getArtistData();
  const fetchReelsData = await getReelsData();

  return (
    <div className="font-bold  flex flex-col">
      릴스 테스트 페이지
      <div className="font-bold flex flex-col">
        <h1>아티스트 리스트</h1>
        {fetchArtistData?.map((artist) => (
          <div key={artist.id}>
            {artist.artistName}
            <br />
            {artist.artistGroup}
          </div>
        ))}
        <h1>릴스 리스트</h1>
        {fetchReelsData?.map((reels) => (
          <div key={reels.id}>
            {reels.artistName}
            <br />
            {reels.reelsContent}
            <br />
            <video
              src={reels.reelsLink}
              controls
              width="300"
              height="300"
            ></video>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
