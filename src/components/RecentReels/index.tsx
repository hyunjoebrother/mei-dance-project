"use client";
import React from "react";
import { useQuery, QueryClientProvider, QueryClient } from "react-query";

const queryClient = new QueryClient();

interface InstagramPost {
  id: string;
  media_url: string;
  permalink: string;
  caption: string;
}

const RecentReels: React.FC = () => {
  const { data: posts, isLoading } = useQuery<InstagramPost[]>(
    "instagramPosts",
    async () => {
      const accessToken: string =
        "IGQWROYzlESWdTbVBPeHRqc2tVOW9xOHF6WFpwZA1o0eFZAMZAk82cEJqV18ydnFkYTV0bk5sRVdVNjRIbEZAWeTROeEsyWUlKVElRc3luM2xnVHFBcF9JbFJQRnRmQXZA5ZA1NaT0w2UFQ3endQUQZDZD";
      const userId: string = "7036437786478855";
      const limit: number = 7;
      const response = await fetch(
        `https://graph.instagram.com/${userId}/media?fields=id,media_url,permalink,caption&limit=${limit}&access_token=${accessToken}`
      );
      const data = await response.json();
      console.log("data:", data);
      return data.data;
    }
  );

  return (
    <section className="w-[960px] h-auto py-3 flex flex-col bg-slate-500 overflow-x-scroll">
      <div>
        {isLoading ? (
          <div className="w-[120px] h-[200px]">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="flex flex-row gap-2 text-center">
            {posts?.map((post: InstagramPost) => (
              <div key={post.id}>
                {post.permalink.includes("reel") && (
                  <div>
                    <video
                      src={post.media_url}
                      controls
                      controlsList="nodownload"
                      loop
                      width="140"
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

const RecentReelsWrapper: React.FC = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <RecentReels />
    </QueryClientProvider>
  );
};

export default RecentReelsWrapper;
