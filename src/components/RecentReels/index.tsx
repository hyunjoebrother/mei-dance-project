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
      const accessToken: string = process.env.NEXT_PUBLIC_ACCESS_TOKEN || "";
      const userId: string = process.env.NEXT_PUBLIC_INSTA_APPID || "";
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
    <section className="scrollbar w-[900px] h-auto py-4 flex flex-col bg-white overflow-x-scroll">
      <div>
        {isLoading ? (
          <div className="w-[150px] h-[220px]">
            <p>Loading...</p>
          </div>
        ) : (
          <div className="scrollbar flex flex-row gap-3 text-center">
            {posts?.map((post: InstagramPost) => (
              <div key={post.id}>
                {post.permalink.includes("reel") && (
                  <div>
                    <a
                      href={post.permalink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <video
                        src={post.media_url}
                        controls
                        controlsList="nodownload"
                        loop
                        width="150"
                      ></video>
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
