"use client";

import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { usePathname } from "next/navigation";
import "../../../globals.css";
import PocketBase from "pocketbase";
import Image from "next/image";
import logo from "../../../../../public/images/logo.png";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import HeadMeta from "@/components/HeadMeta/HeadMeta";

const queryClient = new QueryClient();
const pb = new PocketBase("https://mei-devdance.pockethost.io");

const fetchReelsData = async (id: string) => {
  const reels = await pb.collection("videos").getOne(id);
  // console.log("릴스 정보", reels);
  return reels;
};

const fetchArtistData = async (reelsData: any) => {
  const artists = await pb.collection("artists").getList(1, 80);
  const artistMap: Record<string, any> = {};
  artists?.items.forEach((artist: any) => {
    artistMap[artist.id] = artist;
  });

  const matchingReels = artistMap[reelsData.artistName] || null;
  return matchingReels;
};

const Info: React.FC = () => {
  const pathname = usePathname();
  const id = pathname.match(/\/info\/([^/]+)/)?.[1] || null;

  const { data: artistData, isLoading: artistLoading } = useQuery(
    ["artistData", id],
    () => fetchArtistData(reelsData as any)
  );

  const { data: reelsData } = useQuery(["reelsData", id], () =>
    fetchReelsData(id as string)
  );

  const getArtistName = () => {
    return artistData ? artistData.name : "";
  };

  const getSongName = () => {
    return reelsData ? reelsData.songName : "";
  };

  const getReelsContent = () => {
    return reelsData ? reelsData.caption : "";
  };

  const getReelsLink = () => {
    return reelsData ? reelsData.reelsLink : "";
  };

  const getGroupLogo = (fileName: string, idInfo?: string) => {
    const artist = artistData;
    if (fileName && idInfo && artist) {
      const cdnLink = process.env.NEXT_PUBLIC_CDN_URL;
      if (fileName === "") {
        return logo.src;
      } else {
        return cdnLink + idInfo + "/" + fileName;
      }
    } else {
      return logo.src;
    }
  };

  const getArtistGroup = () => {
    return artistData ? artistData.group : "";
  };

  const formatCdnLink = (fileName: string, idInfo?: string) => {
    if (idInfo) {
      const cdnLink = process.env.NEXT_PUBLIC_CDN_URL;
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  return (
    <>
      <HeadMeta />
      <section className="w-full flex min-h-screen flex-col gap-10 items-center 2xs:pt-20 xs:pt-24 pt-28 tb:pt-24 lg:pt-40 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
        <header className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-50 bg-gradient-to-b from-white backdrop-blur-2xl">
          <div className="py-3 tb:py-4 lg:py-5 2xs:px-5 xs:px-8 2sm:px-12 sm:px-16 tb:px-16 lg:px-24 xl:px-32 flex items-center justify-between">
            <a href="/choom">
              <SkipPreviousIcon
                sx={{ color: "#FF32AD" }}
                className="w-7 h-7 2sm:w-8 2sm:h-8 sm:w-8 sm:h-8 tb:w-10 tb:h-10 lg:w-14 lg:h-14"
              />
            </a>
            <a href="/">
              <Image
                src={logo}
                alt=""
                className="2xs:w-20 2xs:h-10 xs:w-24 xs:h-12 2sm:w-[7.2rem] 2sm:h-[3.6rem] w-[7rem] h-14 lg:w-40 lg:h-20 cursor-pointer"
              />
            </a>
          </div>
        </header>
        <div className="w-full px-2 2sm:px-8 sm:px-20 tb:px-16 lg:px-24 xl:px-48 flex flex-col tb:flex-row lg:flex-row tb:gap-8 lg:gap-10 items-center justify-center">
          <div className="w-full h-auto flex flex-col 2xs:px-8 xs:px-10 2sm:px-4 sm:px-16 xl:px-32 items-center lg:items-start">
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
                playsInline
              ></video>
            </div>
          </div>
          <div className="w-full flex flex-col px-6 lg:px-10 xl:px-12 items-center">
            <div className="w-full 2xs:mt-10 mt-12 px-6 py-3 flex flex-row gap-6 justify-start items-center bg-white rounded-2xl">
              <>
                {" "}
                {artistLoading ? (
                  <div className="spinnerArtist" />
                ) : (
                  <button>
                    <img
                      className="2xs:w-10 2xs:h-10 xs:w-10 xs:h-10 2sm:w-12 2sm:h-12 w-14 h-14 rounded-full"
                      src={getGroupLogo(artistData?.logo, artistData?.id)}
                      alt=""
                    />
                  </button>
                )}
                <div className="flex flex-col">
                  <h3 className="2xs:text-sm xs:text-sm text-lg font-bold">
                    {getSongName()}
                  </h3>
                  <p className="text-xs">
                    {getArtistGroup() === getArtistName()
                      ? getArtistName()
                      : `${getArtistGroup()} - ${getArtistName()}`}
                  </p>
                </div>
              </>
            </div>
            <div className="my-4 justify-start text-left">
              <div>
                {getReelsContent() && (
                  <p
                    className="2xs:text-xs xs:text-xs text-sm px-3 2xs:my-3 my-6 tb:my-10 lg:my-8 xl:my-12 font-medium text-white"
                    dangerouslySetInnerHTML={{
                      __html: getReelsContent().replace(/^<p>|<\/p>$/g, ""),
                    }}
                  />
                )}
              </div>
            </div>
            <div className="w-full flex mb-20 justify-center items-center text-center">
              <a href={getReelsLink()} target="_blank">
                <button className="px-9 py-3 bg-pink-700 font-bold 2xs:text-xs xs:text-sm text-lg text-white rounded-full">
                  릴스로 보러가기
                </button>
                <p className="text-xs xl:text-sm text-white mt-2">
                  좋아요, 댓글, 칭찬해주기😘
                </p>
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
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
