"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { usePathname } from "next/navigation";
import "../../../globals.css";
import PocketBase from "pocketbase";
import Image from "next/image";
// import mainLogo from "../../../public/images/logo.png";

const queryClient = new QueryClient();
const pb = new PocketBase("http://127.0.0.1:8090");

interface InstagramPost {
  id: string;
  permalink: string;
  media_url: string;
}

const fetchReelsData = async (id: string) => {
  const reels = await pb.collection("reels").getOne(id);
  console.log("릴스 정보", reels);
  return reels;
};

const fetchArtistData = async (reelsData: any) => {
  const artists = await pb.collection("artists").getList();
  const matchingReels =
    artists?.items.find((artist) => artist.id === reelsData.artistName) || null;
  console.log("해당 아티스트 정보", matchingReels);

  return matchingReels;
};

const Info: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.match(/\/info\/([^/]+)/)?.[1] || null;

  const { data: reelsData, isLoading: reelsLoading } = useQuery(
    "reelsData",
    () => fetchReelsData(id as string)
  );

  const { data: artistData, isLoading: artistLoading } = useQuery(
    "artistData",
    () => fetchArtistData(reelsData as any)
  );

  const { data: posts, isLoading: instagramLoading } = useQuery<
    InstagramPost[]
  >("instagramPosts", async () => {
    const accessToken: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
    const userId: string = process.env.NEXT_PUBLIC_INSTA_APPID || "";
    const limit: number = 100;
    const response = await fetch(
      `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,caption&limit=${limit}&access_token=${accessToken}`
    );
    const data = await response.json();
    console.log("data:", data);
    return data.data;
  });

  const getArtistName = () => {
    return artistData ? artistData.name : "Unknown";
  };

  const getSongName = () => {
    return reelsData ? reelsData.songName : "Unknown";
  };

  const getReelsContent = () => {
    return reelsData ? reelsData.reelsContent : "Unknown";
  };

  const getReelsLink = () => {
    return reelsData ? reelsData.reelsLink : "Unknown";
  };

  const getGroupLogo = () => {
    const artist = artistData;
    const firstFile = artist?.logo || "";
    return artist
      ? pb.files.getUrl(artist, firstFile, {
          thumb: "44x44",
        })
      : "mainLogo";
  };

  const getArtistGroup = () => {
    return artistData ? artistData.group : "Unknown";
  };

  if (artistLoading || reelsLoading || instagramLoading)
    return <p>Loading...</p>;

  return (
    <section className="w-full flex min-h-screen flex-col gap-10 items-center pt-20 overflow-hidden">
      <header className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 py-3 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto  lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30">
        <div className="flex items-center justify-between px-10">
          <a href="/choom">
            {/* <Image src={mainLogo} alt="" className="w-9 h-9 cursor-pointer" /> */}
            <p>뒤로가기</p>
          </a>
          <a href="/">
            {/* <Image src={mainLogo} alt="" className="w-9 h-9 cursor-pointer" /> */}
            <p>LOGO</p>
          </a>
        </div>
      </header>
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full h-auto flex flex-col items-center">
          {posts?.map((post) => {
            if (post.permalink.includes(reelsData?.reelsLink)) {
              return (
                <div
                  key={post.id}
                  className="w-full h-full flex flex-col items-center"
                >
                  <video
                    src={post.media_url}
                    controls
                    controlsList="nodownload"
                    autoPlay
                    loop
                    width={280}
                    className="mb-2"
                  ></video>
                </div>
              );
            } else {
              return (
                <div
                  key={post.id}
                  className="w-full h-full flex flex-col items-center bg-slate-400"
                ></div>
              );
            }
          })}
        </div>
        <div className="flex flex-col mt-10">
          <div className="mx-10 px-4 py-3 flex flex-row justify-between items-center bg-slate-400 rounded-2xl">
            <button
              style={{
                backgroundImage: `url(${getGroupLogo()})`,
                backgroundSize: "cover",
                width: "50px",
                height: "50px",
                borderRadius: "100px",
              }}
            ></button>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{getSongName()}</h3>
              <p className="text-xs">
                {getArtistGroup() === getArtistName()
                  ? getArtistName()
                  : `${getArtistGroup()} - ${getArtistName()}`}
              </p>
            </div>
          </div>
          <div>
            <div>
              {getReelsContent() && (
                <p
                  className="text-sm px-10 my-6"
                  dangerouslySetInnerHTML={{
                    __html: getReelsContent().replace(/^<p>|<\/p>$/g, ""),
                  }}
                />
              )}
            </div>
          </div>
          <div className="w-full flex justify-center items-center">
            <a href={getReelsLink()} target="_blank">
              <button className="px-6 py-2 bg-blue-300 font-medium rounded-3xl">
                릴스로 보기
              </button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

const InfoWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Info />
    </QueryClientProvider>
  );
};

export default InfoWrapper;
