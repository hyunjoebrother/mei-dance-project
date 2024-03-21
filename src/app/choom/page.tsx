"use client";

import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import "../globals.css";
import "./index.css";
import PocketBase from "pocketbase";
import Image from "next/image";
import Link from "next/link";
// import mainLogo from "../../../public/images/logo.png";

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
  const artists = await pb.collection("artists").getList();
  return artists?.items || [];
};

const fetchReelsData = async () => {
  const reels = await pb.collection("videos").getList();
  return reels?.items || [];
};

const Choom: React.FC = () => {
  const [selectedGroup, setSelectedGroup] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasFetched, setHasFetched] = useState(false);

  const { data: artistData, isLoading: artistLoading } = useQuery(
    "artistData",
    fetchArtistData
  );

  useEffect(() => {}, [selectedGroup]);

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
  } = useQuery(["reelsData", currentPage], () => fetchReelsData(), {
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

  console.log("필터링된 데이터", filteredReels);

  const formatCdnLink = (fileName: string, idInfo?: string) => {
    if (idInfo) {
      const cdnLink = "https://mei-dance.cdn.misae.us/l072ms0ejrlm6y9/";
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  const loadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  const loadPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  const isPreviousPageAvailable = currentPage > 1;
  const isNextPageAvailable = reelsData?.length === 24;

  // if (artistLoading || reelsLoading || instagramLoading)
  //   return (
  //     <div className="loading-overlay">
  //       <div className="spinner">{/* <img src={mainLogo} alt="" /> */}</div>
  //     </div>
  //   );

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
          <div className="w-[3000px] py-2 flex bg-pink-100 overflow-x-scroll">
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
        {filteredReels?.map((reels) => (
          <Link href={`/choom/info/${reels.id}`} key={reels.id}>
            <div className="flex flex-col items-center">
              <div key={reels.id} className="flex flex-col items-center">
                {/* Add conditional rendering for loading state */}
                {isFetching && (
                  <div className="loading-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
                <img src={formatCdnLink(reels.thumbnail, reels.id)} alt="" />
                {/* <video
                  src={formatCdnLink(reels.video, reels.id)}
                  controls
                  controlsList="nodownload"
                  loop
                  height={180}
                  className="mb-1 w-full"
                ></video> */}
                <p className="text-xs mb-2 overflow-hidden whitespace-nowrap overflow-ellipsis">
                  {reels?.songName}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      {!selectedGroup && (
        <div className="flex justify-center mt-4">
          {isPreviousPageAvailable && (
            <button
              onClick={loadPreviousPage}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              이전 페이지
            </button>
          )}
          {isNextPageAvailable && (
            <button
              onClick={loadMore}
              className="px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              다음 페이지
            </button>
          )}
        </div>
      )}
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
