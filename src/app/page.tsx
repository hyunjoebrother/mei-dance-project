import Header from "@/components/Header";
import RecentReelsWrapper from "@/components/RecentReels";
import RecentReels from "@/components/RecentReels";
import Image from "next/image";
import Link from "next/link";

const Main: React.FC = () => {
  return (
    <section className="w-full flex min-h-screen flex-col gap-10 items-center pt-28 overflow-hidden">
      <Header />
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold text-lg">도표 영역입니다</h3>
        <div className="w-full h-48 bg-gray-600">도표 영역</div>
      </div>
      <div className="w-full">
        <h3 className="pl-8 mb-2 font-bold text-lg">최신 영역입니다</h3>
        <div className="w-full h-auto overflow-x-auto">
          <RecentReelsWrapper />
        </div>
      </div>
      <div>
        <Link href="/choom">
          <button className="w-24 h-10 bg-red-500 rounded-2xl">
            다음 페이지로 이동
          </button>
        </Link>
      </div>
    </section>
  );
};

export default Main;
