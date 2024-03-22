"use client";
import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import RecentReelsWrapper from "@/components/RecentReels";
import Link from "next/link";
const ChartData = React.lazy(() => import("@/components/ChartData"));

const Main: React.FC = () => {
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <section className="w-full flex min-h-screen flex-col lg:px-28 xs:gap-10 gap-12 tb:gap-16 lg:gap-20 items-center 2xs:pt-20 xs:pt-24 2sm:pt-28 sm:pt-28 tb:pt-32 pt-40 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
      <Header />
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold 2xs:text-sm xs:text-lg text-xl">
          MEI의 댄스 차트
        </h3>
        <div className="w-full h-auto">
          {isClient && (
            <React.Suspense fallback={<div>Loading...</div>}>
              <ChartData />
            </React.Suspense>
          )}
        </div>
      </div>
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold 2xs:text-sm xs:text-lg text-xl">
          최근 댄스 영상
        </h3>
        <div className="scrollbar w-full h-auto overflow-x-auto">
          <RecentReelsWrapper />
        </div>
      </div>
      <div className="mb-12">
        <Link href="/choom">
          <button className="2xs:px-6 xs:px-7 2sm:px-8 px-9 py-3 bg-pink-700 font-bold 2xs:text-xs xs:text-sm 2sm:text-base text-lg text-white rounded-full">
            댄스 영상 보러가기
          </button>
        </Link>
      </div>
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold 2xs:text-sm xs:text-lg text-xl">
          CONTACT MEI
        </h3>
        <div className="w-full text-xs 2sm:text-sm sm:text-sm tb:text-sm lg:text-xl flex flex-col gap-3 px-6 py-5 bg-white">
          <p className="font-medium">
            안녕하세요! 춤을 좋아하는 개발자 MEI입니다 <br />
            아티스트별로 어떤 춤이 있는지 확인해보세요!
          </p>
          <p className="font-bold text-slate-400">
            정보) 밑으로 내릴수록 과거라서 춤 실력 형편없음 주의!
          </p>
          <a
            href="https://linkbio.co/6010904ydlS94"
            className="no-underline"
            target="_blank"
            rel="noreferrer noopener"
          >
            <button className="mt-2 2xs:px-6 xs:px-7 2sm:px-8 px-9 py-3 bg-mainPink font-bold 2xs:text-xs xs:text-sm 2sm:text-base text-lg text-white rounded-2xl">
              문의사항은 Contact Mei
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Main;
