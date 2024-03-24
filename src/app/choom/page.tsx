"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "../globals.css";
import PocketBase from "pocketbase";
import Image from "next/image";
import Link from "next/link";
import whiteLogo from "../../../public/images/whiteLogo.png";
import AudiotrackRoundedIcon from "@mui/icons-material/AudiotrackRounded";

const queryClient = new QueryClient();
let pb: PocketBase;

try {
  pb = new PocketBase("https://mei-devdance.pockethost.io");
} catch (error) {
  console.log("Error: ", error);
  /*@ts-ignore*/
  console.log(error.isAbort);
}

const fetchArtistData = async () => {
  const artists = await pb.collection("artists").getList(1, 100);
  return artists?.items || [];
};

const fetchReelsData = async (page: number) => {
  const reels = await pb.collection("videos").getList(page, 310);
  const sortedReels = reels?.items.sort((a, b) => {
    return Date.parse(b.upload_time) - Date.parse(a.upload_time);
  });
  return sortedReels || [];
};

const Choom: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);

  const { data: artistData, isLoading: artistLoading } = useQuery(
    "artistData",
    fetchArtistData
  );

  useEffect(() => {
    if (selectedGroup) {
      setCurrentPage(1);
    }
  }, [selectedGroup]);

  useEffect(() => {
    if (!hasFetched) {
      fetchReelsData;
      setHasFetched(true);
    }
  }, [selectedGroup, hasFetched]);

  const {
    data: reelsData,
    isLoading: reelsLoading,
    isFetching,
  } = useQuery(["reelsData", currentPage], () => fetchReelsData(currentPage), {
    keepPreviousData: true,
    refetchOnWindowFocus: false,
  });

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

  const formatCdnLink = (fileName: string, idInfo?: string) => {
    if (idInfo) {
      const cdnLink = process.env.NEXT_PUBLIC_CDN_URL;
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  if (artistLoading || reelsLoading)
    return (
      <div className="loading-overlay">
        <div className="spinner" />
      </div>
    );

  return (
    <section className="w-full flex min-h-screen flex-col tb:px-16 lg:px-20 xl:px-28 gap-10 items-center pt-36 tb:pt-[17rem] lg:pt-72 xl:pt-80 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
      <header className="fixed left-0 top-0 flex flex-col w-full justify-center border-b border-gray-50 bg-gradient-to-b from-pink-500 backdrop-blur-2xl">
        <div className="py-3 tb:py-4 lg:py-5 flex items-center justify-center">
          <a href="/">
            <Image
              src={whiteLogo}
              alt=""
              className="2xs:w-20 2xs:h-10 xs:w-24 xs:h-12 2sm:w-[7.2rem] 2sm:h-[3.6rem] w-[7rem] h-14 lg:w-40 lg:h-20 cursor-pointer"
            />
          </a>
        </div>
        <div className="scrollbar w-full h-auto border-t-2 border-b-2 border-pink-400 overflow-x-auto">
          <div className="scrollbar w-[3200px] sm:w-[3200px] tb:w-[3600px] lg:w-[4400px] xl:w-[5000px] px-2 py-3 tb:px-4 tb:py-4 lg:px-8 lg:py-4 xl:px-10 xl:py-5 flex bg-white overflow-x-scroll">
            <div className="scrollbar flex flex-row px-4 xs:gap-4 sm:gap-3 tb:gap-7 gap-5 text-center">
              {uniqueGroups.map((group) => (
                <div
                  key={group}
                  onClick={() => handleGroupSelection(group)}
                  className="flex flex-col gap-2 items-center justify-center"
                >
                  <button
                    style={{
                      backgroundImage: `url(${getGroupLogo(group)})`,
                      backgroundSize: "cover",
                    }}
                    className={`2xs:w-10 2xs:h-10 xs:w-[3.4rem] xs:h-[3.4rem] w-[3.6rem] h-[3.6rem] sm:w-[4.4rem] sm:h-[4.4rem] tb:w-20 tb:h-20 lg:w-16 lg:h-16 xl:w-20 xl:h-20 rounded-full ${
                      group === selectedGroup
                        ? "border-[3px] border-mainPink"
                        : ""
                    }`}
                  ></button>
                  <p
                    className={`2xs:text-[0.64rem] xs:text-xs 2sm:text-xs lg:text-xs xl:text-sm font-medium overflow-hidden whitespace-nowrap overflow-ellipsis ${
                      group === selectedGroup ? "text-mainPink font-black" : ""
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
      <div className="w-full lg:px-16 xl:px-28 grid grid-cols-3 lg:grid-cols-5 xl:grid-cols-5">
        {filteredReels?.map((reels) => (
          <Link href={`/choom/info/${reels.id}`} key={reels.upload_time}>
            <div className="flex flex-col items-center border-2 border-mainPink bg-white">
              <div
                key={reels.upload_time}
                className="flex flex-col items-star"
              >
                {isFetching && (
                  <div className="loading-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
                <img src={formatCdnLink(reels.thumbnail, reels.id)} alt="" />
                <p className="ml-2 2xs:hidden xs:hidden 2sm:hidden sm:hidden tb:hidden text-sm font-medium lg:my-3 xl:my-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                <AudiotrackRoundedIcon sx={{ color: "#FF32AD", width: "1.2rem" }} />
                  {reels?.songName.length > 14
                    ? reels?.songName.substring(0, 10) + "..."
                    : reels?.songName}
                </p>
                <p className="ml-3 2xs:hidden xs:hidden 2sm:hidden sm:hidden lg:hidden text-xs font-medium my-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                <AudiotrackRoundedIcon sx={{ color: "#FF32AD", width: "1rem" }} />
                  {reels?.songName.length > 18
                    ? reels?.songName.substring(0, 16) + "..."
                    : reels?.songName}
                </p>
                <p className="ml-2 2xs:hidden tb:hidden lg:hidden text-xs font-medium my-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                <AudiotrackRoundedIcon sx={{ color: "#FF32AD", width: ".8rem" }} />
                  {reels?.songName.length > 12
                    ? reels?.songName.substring(0, 11) + "..."
                    : reels?.songName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="2xs:px-6 xs:px-6 2sm:px-4 2xs:my-10 my-12">
        <div className="w-full 2xs:text-xs xs:text-xs 2sm:text-sm text-base tb:text-xl lg:text-xl tb:px-8 tb:py-6 lg:px-10 lg:py-6 px-4 py-3 flex flex-col justify-center items-center bg-white rounded-2xl">
          정보) 과거로 갈수록 춤 실력이 형편없어집니다.
        </div>
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
