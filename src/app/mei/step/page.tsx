"use client";

import React, { useState, useEffect } from "react";
import "../../globals.css";

interface ReelsData {
  id: string;
  media_url: string;
  permalink: string;
}

export default function App() {
  const [reelsData, setReelsData] = useState<ReelsData | null>(null);

  useEffect(() => {
    const fetchReelsData = async () => {
      try {
        const REELS_LINK =
          "https://www.instagram.com/reel/C4ciI8UBrdP/?utm_source=ig_web_copy_link&igsh=MzRlODBiNWFlZA=="; // Your Instagram Reel Link
        const response = await fetch(REELS_LINK);
        const html = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, "text/html");
        const scripts = Array.from(doc.querySelectorAll("script"));
        const jsonScript = scripts.find((script) =>
          script.textContent?.includes("window.__additionalDataLoaded")
        );
        if (jsonScript) {
          const jsonData = JSON.parse(
            jsonScript.textContent!.split("=")[1].trim().slice(0, -1)
          );
          const reels =
            jsonData.graphql.shortcode_media.edge_sidecar_to_children.edges.map(
              (edge: any) => ({
                id: edge.node.id,
                media_url: edge.node.display_resources[0].src,
                permalink: `https://www.instagram.com/p/${edge.node.shortcode}/`,
              })
            );
          setReelsData(reels[0]); // Assuming only one reel is available
        }
      } catch (error) {
        console.error("Error fetching Instagram Reel:", error);
      }
    };

    fetchReelsData();
  }, []);

  return (
    <div className="font-bold  flex flex-col">
      릴스 테스트 페이지
      <div className="font-bold flex flex-col">
        <h1>인스타그램 릴스</h1>
        {reelsData ? (
          <div>
            <img src={reelsData.media_url} alt="Instagram Reel" />
            <a
              href={reelsData.permalink}
              target="_blank"
              rel="noopener noreferrer"
            >
              View on Instagram
            </a>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
}
