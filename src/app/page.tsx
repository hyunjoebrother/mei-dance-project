import Header from "@/components/Header";
import RecentReelsWrapper from "@/components/RecentReels";
import RecentReels from "@/components/RecentReels";
import Image from "next/image";
import Link from "next/link";

const Main: React.FC = () => {
  return (
    <section className="w-full flex min-h-screen flex-col gap-10 items-center pt-28 overflow-hidden bg-gradient-to-b from-pink-200 to-pink-400 backdrop-blur-2xl">
      <Header />
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold text-xl">도표 영역입니다</h3>
        <div className="w-full h-48 bg-gray-600">도표 영역</div>
      </div>
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold text-xl">최근 댄스 영상</h3>
        <div className="scrollbar w-full h-auto overflow-x-auto">
          <RecentReelsWrapper />
        </div>
      </div>
      <div>
        <Link href="/choom">
          <button className="px-9 py-3 bg-pink-700 font-bold text-lg text-white rounded-full">
            댄스 영상 보러가기
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Main;
