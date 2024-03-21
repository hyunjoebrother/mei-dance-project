"use client";

import React, { useState } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { usePathname } from "next/navigation";
import "../../../globals.css";
import PocketBase from "pocketbase";
import Image from "next/image";
// import mainLogo from "../../../public/images/logo.png";

const queryClient = new QueryClient();
const pb = new PocketBase("https://mei-devdance.pockethost.io");

const fetchReelsData = async (id: string) => {
  const reels = await pb.collection("videos").getOne(id);
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

  const { data: artistData, isLoading: artistLoading } = useQuery(
    "artistData",
    () => fetchArtistData(reelsData as any)
  );

  const { data: reelsData, isLoading: reelsLoading } = useQuery(
    "reelsData",
    () => fetchReelsData(id as string)
  );

  const getArtistName = () => {
    return artistData ? artistData.name : "Unknown";
  };

  const getSongName = () => {
    return reelsData ? reelsData.songName : "Unknown";
  };

  const getReelsContent = () => {
    return reelsData ? reelsData.caption : "Unknown";
  };

  const getReelsLink = () => {
    return reelsData ? reelsData.reelsLink : "Unknown";
  };

  const getGroupLogo = (fileName: string, idInfo?: string) => {
    const artist = artistData;
    if (idInfo && artist) {
      const cdnLink = "https://mei-dance.cdn.misae.us/njcroodvcrhih1k/";
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  const getArtistGroup = () => {
    return artistData ? artistData.group : "Unknown";
  };

  const formatCdnLink = (fileName: string, idInfo?: string) => {
    if (idInfo) {
      const cdnLink = "https://mei-dance.cdn.misae.us/l072ms0ejrlm6y9/";
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  if (artistLoading || reelsLoading) return <p>Loading...</p>;

  return (
    <section className="w-full flex min-h-screen flex-col gap-10 items-center pt-20 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
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
      <div className="w-full px-10 flex flex-col items-center justify-center">
        <div className="w-full h-auto flex flex-col items-center">
          <div
            key={reelsData?.id}
            className="w-full h-full border-2 border-white flex flex-col items-center"
          >
            <video
              src={formatCdnLink(reelsData?.video, reelsData?.id)}
              controls
              controlsList="nodownload"
              autoPlay
              loop
            ></video>
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          <div className="w-full mt-12 px-6 py-3 flex flex-row gap-6 justify-start items-center bg-white rounded-2xl">
            <button>
              <img
                className="w-14 h-14 rounded-full"
                src={getGroupLogo(artistData?.logo, artistData?.id)}
                alt=""
              />
            </button>
            <div className="flex flex-col">
              <h3 className="text-lg font-bold">{getSongName()}</h3>
              <p className="text-xs">
                {getArtistGroup() === getArtistName()
                  ? getArtistName()
                  : `${getArtistGroup()} - ${getArtistName()}`}
              </p>
            </div>
          </div>
          <div className="my-8 justify-start text-left">
            <div>
              {getReelsContent() && (
                <p
                  className="text-sm px-4 my-6 font-medium text-white"
                  dangerouslySetInnerHTML={{
                    __html: getReelsContent().replace(/^<p>|<\/p>$/g, ""),
                  }}
                />
              )}
            </div>
          </div>
          <div className="w-full flex mb-20 justify-center items-center">
            <a href={getReelsLink()} target="_blank">
              <button className="px-9 py-3 bg-pink-700 font-bold text-lg text-white rounded-full">
                릴스로 보러가기
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

export const runtime = "edge";
