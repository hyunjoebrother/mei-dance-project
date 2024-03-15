import Link from "next/link";
import "../globals.css";

export default function App() {
  if (typeof window !== "undefined") {
    const code = new URL(window.location.href).searchParams.get("code");
  }
  const clientCode = "347672391592808";
  const redirectUri = "https://mei-dance-project.pages.dev/mei";

  const url = `https://api.instagram.com/oauth/authorize
  ?client_id=${clientCode}
  &redirect_uri=${redirectUri}
  &scope=user_profile,user_media
  &response_type=code
`;

  return (
    <div className="font-bold  flex flex-col">
      온보딩 첫번째 페이지입니다
      <Link href="/mei/step">
        <button className="w-24 h-10 bg-red-500 rounded-2xl">
          다음 페이지로 이동
        </button>
      </Link>
      <a href={url}>인스타그램 테스트</a>
    </div>
  );
}
