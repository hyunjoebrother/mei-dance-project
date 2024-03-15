import Link from "next/link";
import '../globals.css';

export default function App() {
  return (
      <div className="font-bold  flex flex-col">
        온보딩 첫번째 페이지입니다
        <Link href="/mei/step">
          <button className="w-24 h-10 bg-red-500 rounded-2xl">
            다음 페이지로 이동
          </button>
        </Link>
      </div>
  );
}
