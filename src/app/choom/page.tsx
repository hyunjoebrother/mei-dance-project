"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "../globals.css";
import PocketBase from "pocketbase";
import Image from "next/image";
import Link from "next/link";
// import mainLogo from "../../../public/images/logo.png";

const queryClient = new QueryClient();
const pb = new PocketBase("https://mei-dance.pockethost.io");

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
}

const fetchArtistData = async () => {
  const artists = await pb.collection("artists").getList();
  return artists?.items || [];
};

const fetchReelsData = async () => {
  const reels = await pb
    .collection("reels")
    .getList(1, 300, { sort: "-reelsDate" });
  return reels?.items || [];
};

const Choom: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);

  const { data: artistData, isLoading: artistLoading } = useQuery(
    "artistData",
    fetchArtistData
  );

  const { data: reelsData, isLoading: reelsLoading } = useQuery(
    "reelsData",
    fetchReelsData
  );

  const handleGroupSelection = (group: string) => {
    setSelectedGroup((prevGroup) => (prevGroup === group ? null : group));
  };

  const getUniqueGroups = () => {
    if (!artistData) return [];
    return Array.from(new Set(artistData.map((artist) => artist.group)));
  };

  const getGroupLogo = (group: string) => {
    const artist = artistData?.find((artist) => artist.group === group);
    const firstFile = artist?.logo || "";
    return artist
      ? pb.files.getUrl(artist, firstFile, {
          thumb: "44x44",
        })
      : "mainLogo";
  };

  const uniqueGroups = getUniqueGroups();

  const getArtistGroup = (artistId: string) => {
    const artist = artistData?.find((artist) => artist.id === artistId);
    return artist ? artist.group : "Unknown";
  };

  const filteredReels = selectedGroup
    ? reelsData?.filter(
        (reels) => getArtistGroup(reels.artistName) === selectedGroup
      )
    : reelsData;

  const { data: posts, isLoading: instagramLoading } = useQuery<
    InstagramPost[]
  >("instagramPosts", async () => {
    const accessToken: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    const userId: string = process.env.NEXT_PUBLIC_INSTA_APPID || "";
    const limitPerRequest: number = 100;
    const totalLimit: number = 500;
    let filteredData: InstagramPost[] = [];

    const requests = Array.from(
      { length: totalLimit / limitPerRequest },
      async (_, index) => {
        const offset = index * limitPerRequest;
        const url = `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,media_type&limit=${limitPerRequest}&access_token=${accessToken}&offset=${offset}`;
        const response = await fetch(url);
        const data = await response.json();
        return data.data.filter(
          (item: { media_type: string }) => item.media_type === "VIDEO"
        );
      }
    );

    const responses = await Promise.all(requests);
    responses.forEach((responseData) => {
      filteredData = filteredData.concat(responseData);
    });

    console.log("filtered data:", filteredData);
    return filteredData;
  });

  if (artistLoading || reelsLoading || instagramLoading)
    return <p>Loading...</p>;

  return (
    <section className="w-full flex min-h-screen flex-col gap-10 items-center pt-36 overflow-hidden">
      <header className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="flex items-center justify-center">
          <a href="/">
            {/* <Image src={mainLogo} alt="" className="w-9 h-9 cursor-pointer" /> */}
            <p>LOGO</p>
          </a>
        </div>
        <div className="w-full h-auto overflow-x-auto">
          <div className="w-[480px] py-2 flex bg-pink-100 overflow-x-scroll">
            <div className="flex flex-row px-4 gap-3 text-center">
              {uniqueGroups.map((group) => (
                <div
                  key={group}
                  onClick={() => handleGroupSelection(group)}
                  className="flex flex-col gap-1"
                >
                  <button
                    style={{
                      backgroundImage: `url(${getGroupLogo(group)})`,
                      backgroundSize: "cover",
                      width: "50px",
                      height: "50px",
                      borderRadius: "100px",
                    }}
                    className={`text-xs ${
                      group === selectedGroup ? "border-2 border-pink-700" : ""
                    }`}
                  ></button>
                  <p
                    className={`text-xs ${
                      group === selectedGroup ? "text-pink-700 font-bold" : ""
                    }`}
                  >
                    {group}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </header>
      <div className="w-full grid grid-cols-3">
        {filteredReels?.map((reels) => {
          const matchingPost = posts?.find((post) =>
            post.permalink.includes(reels.reelsLink)
          );
          return (
            <Link href={`/choom/info/${reels?.id}`} key={reels.id}>
              <div key={reels.id} className="flex flex-col items-center">
                <video
                  src={matchingPost?.media_url}
                  controls
                  controlsList="nodownload"
                  loop
                  height={180}
                  className="mb-1 w-full"
                ></video>
                <p className="text-xs mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {reels?.songName}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

const ChoomWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Choom />
    </QueryClientProvider>
  );
};

export default ChoomWrapper;
