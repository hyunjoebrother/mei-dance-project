"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import "../globals.css";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

const App: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken: string =
          "IGQWRNVXBiLTM0MnQzWGpESkdPMnBYYVA2cFlxTk5VWGlCcFN1bHhrWkh1bnhiMnU3MHBiaTJvUmRJS0o3dnk1SUpxSFdZAVFRUeWRkWVdYN2lHYWxqTDhxNnZAYdHJsUVFycXoxYTJIbk5zOHJqZAzRwZAkpxcjBHbTNEWUp0Wm1zNXlIdwZDZD"; // 토큰 주기적으로 업데이트 필요
        const userId: string = "7036437786478855";
        const limit: number = 100;

        const response = await fetch(
          `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,caption&limit=${limit}&access_token=${accessToken}`
        );
        const data = await response.json();
        console.log("data:", data);
        setPosts(data.data);
        console.log("data.data:", data.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching Instagram posts:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="font-bold flex flex-col">
      온보딩 첫번째 페이지입니다
      <Link href="/mei/step">
        <button className="w-24 h-10 bg-red-500 rounded-2xl">
          다음 페이지로 이동
        </button>
      </Link>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {posts.map((post: InstagramPost) => (
            // <div key={post.id}>
            //   <img src={post.media_url} alt="Instagram Post" />
            //   <a
            //     href={post.permalink}
            //     target="_blank"
            //     rel="noopener noreferrer"
            //   >
            //     View on Instagram
            //   </a>
            // </div>
            <div key={post.id}>
              {post.permalink.includes("reel") && post.caption.includes("#seventeen") ? ( // Check if the post is a reel
                <div>
                  <video
                    src={post.media_url}
                    controls
                    width="300"
                    height="300"
                  ></video>{" "}
                  {/* Render reel as video */}
                  {/* <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    릴스 확인하러 ㄱㄱㄱ
                  </a> */}
                  <p>{post.caption}</p>
                </div>
              ) : (
                <div>
                  {/* <img src={post.media_url} alt="Instagram Post" />
                  <a
                    href={post.permalink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    게시글 확인하러 ㄱㄱㄱ
                  </a>*/}
                </div> 
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;
