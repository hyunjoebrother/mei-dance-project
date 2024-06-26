"use client";
import React, { useState, useEffect } from "react";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";
import PocketBase from "pocketbase";
import Link from "next/link";

const queryClient = new QueryClient();
let pb: PocketBase;

try {
  pb = new PocketBase("https://mei-devdance.pockethost.io");
} catch (error) {
  console.log("Error: ", error);
  /*@ts-ignore*/
  console.log(error.isAbort);
}

const fetchReelsData = async () => {
  const reels = await pb
    .collection("videos")
    .getList(1, 7, { sort: "-upload_time" });
  return reels?.items || [];
};

const RecentReels: React.FC = () => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchReelsData;
      setHasFetched(true);
    }
  }, [hasFetched]);

  const { data: reelsData, isFetching } = useQuery(
    ["reelsData"],
    () => fetchReelsData(),
    {
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const formatCdnLink = (fileName: string, idInfo?: string) => {
    if (idInfo) {
      const cdnLink = process.env.NEXT_PUBLIC_CDN_URL;
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  return (
    <section className="scrollbar 2xs:w-[680px] xs:w-[920px] 2sm:w-[1200px] sm:w-[1400px] tb:w-[1600px] lg:w-[2000px] h-auto py-4 lg:px-4 flex flex-col bg-white overflow-x-scroll">
      <div>
        <div className="scrollbar flex flex-row gap-3 text-center">
          {reelsData?.map((reels) => (
            <div
              key={reels.upload_time}
              className="flex flex-col items-center border-2 border-mainPink bg-white"
            >
              <div className="flex flex-col items-center">
                {isFetching && (
                  <div className="loading-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
                <Link href={`/choom/info/${reels.id}`}>
                  <img src={formatCdnLink(reels.thumbnail, reels.id)} className="2xs:w-48 xs:w-64 2sm:w-72 sm:w-80 tb:w-[16rem] lg:w-[24rem]" alt="" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const RecentReelsWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecentReels />
    </QueryClientProvider>
  );
};

export default RecentReelsWrapper;
