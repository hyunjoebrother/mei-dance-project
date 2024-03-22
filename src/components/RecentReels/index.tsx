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
  const reels = await pb.collection("videos").getList(1, 7);
  return reels?.items || [];
};

const RecentReels: React.FC = () => {
  const [hasFetched, setHasFetched] = useState(false);

  useEffect(() => {
    if (!hasFetched) {
      fetchReelsData();
      // console.log(reelsData);
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
      const cdnLink = "https://mei-dance.cdn.misae.us/l072ms0ejrlm6y9/";
      return cdnLink + idInfo + "/" + fileName;
    }
    return "";
  };

  return (
    <section className="scrollbar w-[1200px] h-auto py-4 flex flex-col bg-white overflow-x-scroll">
      <div>
        <div className="scrollbar flex flex-row gap-3 text-center">
          {reelsData?.map((reels) => (
            <div className="flex flex-col items-center border-2 border-pink-400 bg-white">
              <div key={reels.id} className="flex flex-col items-center">
                {isFetching && (
                  <div className="loading-overlay">
                    <div className="spinner"></div>
                  </div>
                )}
                <Link href={`/choom/info/${reels.id}`} key={reels.id}>
                  <video
                    src={formatCdnLink(reels?.video, reels?.id)}
                    controls
                    controlsList="nodownload"
                    width={200}
                  ></video>
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
