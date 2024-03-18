"use client";

import React, { useState, useEffect } from "react";
import "../../globals.css";
import PocketBase from "pocketbase";

const pb = new PocketBase("http://127.0.0.1:8090");

const App: React.FC = () => {
  const [artistData, setArtistData] = useState<any[]>([]);
  const [reelsData, setReelsData] = useState<any[]>([]);
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const artists = await pb.collection("artists").getList();
        const reels = await pb.collection("reels").getList();
        setArtistData(artists?.items || []);
        setReelsData(reels?.items || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleGroupSelection = (group: string) => {
    setSelectedGroup(group);
  };

  const getArtistName = (artistId: string) => {
    const artist = artistData.find((artist) => artist.id === artistId);
    return artist ? artist.name : "Unknown";
  };

  const getArtistGroup = (artistId: string) => {
    const artist = artistData.find((artist) => artist.id === artistId);
    return artist ? artist.group : "Unknown";
  };

  const getUniqueGroups = () => {
    return Array.from(new Set(artistData.map((artist) => artist.group)));
  };

  const uniqueGroups = getUniqueGroups();

  const filteredArtists = selectedGroup
    ? artistData.filter((artist) => artist.group === selectedGroup)
    : artistData;

  const filteredReels = selectedGroup
    ? reelsData.filter(
        (reels) => getArtistGroup(reels.artistName) === selectedGroup
      )
    : reelsData;

  return (
    <div className="font-bold flex flex-col">
      <h1>릴스 테스트 페이지</h1>
      <div className="flex flex-col gap-4">
        <h2>아티스트 리스트</h2>
        <div className="flex flex-row gap-2">
          {uniqueGroups.map((group) => (
            <button
              key={group}
              onClick={() => handleGroupSelection(group)}
              className={`text-base ${
                group === selectedGroup ? "text-blue-500" : ""
              }`}
            >
              {group}
            </button>
          ))}
        </div>
        <div>
          {filteredArtists.map((artist) => (
            <div key={artist.id} className="flex flex-row gap-2 items-end">
              <p className="text-base">{artist.name}</p>
              <p className="text-xs">{artist.group}</p>
            </div>
          ))}
        </div>
        <h2>릴스 리스트</h2>
        <div>
          {filteredReels.map((reels) => (
            <div key={reels.id}>
              <p className="text-base">{getArtistName(reels.artistName)}</p>
              <p className="text-xs">{reels.songName}</p>
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
    </div>
  );
};

export default App;
