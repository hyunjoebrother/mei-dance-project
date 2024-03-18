"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { disconnect } from "process";

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

const RecentReels: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const accessToken: string =
          "IGQWROYzlESWdTbVBPeHRqc2tVOW9xOHF6WFpwZA1o0eFZAMZAk82cEJqV18ydnFkYTV0bk5sRVdVNjRIbEZAWeTROeEsyWUlKVElRc3luM2xnVHFBcF9JbFJQRnRmQXZA5ZA1NaT0w2UFQ3endQUQZDZD";
        const userId: string = "7036437786478855";
        const limit: number = 7;
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
    <section className="w-[960px] h-auto py-3 flex flex-col bg-slate-500 overflow-x-scroll">
      <div>
        {loading ? (
          <div className="w-[120px] h-[200px]">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-row gap-2 text-center">
            {posts.map((post: InstagramPost) => (
              <div key={post.id}>
                {post.permalink.includes("reel") && (
                  <div>
                    <video
                      src={post.media_url}
                      controls
                      controlsList="nodownload"
                      loop
                      width="120"
                    ></video>{" "}
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <p className="text-xs text-white">릴스 보기</p>
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default RecentReels;
