"use client";

import { useState, useEffect } from "react";

const videoList = [
  { id: "w1-demo", videoId: "5OSDIqrf74E" },
  { id: "w4-demo", videoId: "fjy_pfygjJc" },
  { id: "w8-demo", videoId: "skfu_UBdYFY" },
  { id: "w8-demo2", videoId: "pwGVCWO46rY" },
  { id: "w8-demo3", videoId: "Fdu-FCfLRHo" }
];

export default function VideosPage() {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  useEffect(() => {
    const fetchVideoData = async () => {
      const data = await Promise.all(
        videoList.map(async (video) => {
          try {
            const res = await fetch(
              `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${video.videoId}&format=json`
            );
            const json = await res.json();
            return {
              ...video,
              title: json.title,
              thumbnail: json.thumbnail_url,
            };
          } catch {
            return {
              ...video,
              title: "Video",
              thumbnail: `https://img.youtube.com/vi/${video.videoId}/mqdefault.jpg`,
            };
          }
        })
      );

      setVideos(data);
      setSelectedVideo(data[0]);
    };

    fetchVideoData();
  }, []);

  if (!selectedVideo) {
    return <p className="text-center py-20">Loading videos...</p>;
  }

  return (
    <section className="py-4 bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 md:px-8">

        <h1 className="text-3xl md:text-4xl font-extrabold text-center">
          Watch our videos
        </h1>

        <div className="mt-10 flex flex-col gap-8">
          {/* Main Video */}
          <div className="md:flex-1">
            <div className="aspect-video rounded-xl overflow-hidden shadow-xl">
              <iframe
                key={selectedVideo.videoId}
                className="w-full h-full"
                src={`https://www.youtube.com/embed/${selectedVideo.videoId}?rel=0`}
                title={selectedVideo.title}
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <h2 className="mt-4 text-xl font-semibold">
              {selectedVideo.title}
            </h2>
          </div>

          {/* Thumbnails */}
          <div className="w-full flex gap-4 overflow-x-auto">
            {videos.map((video) => (
              <div
                key={video.id}
                onClick={() => setSelectedVideo(video)}
                className={`cursor-pointer p-2 rounded-lg transition
                  ${selectedVideo.id === video.id
                    ? "bg-orange-100 shadow-lg"
                    : ""
                  }`}
              >
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="rounded-lg"
                />
                <p className="mt-2 text-sm font-medium text-center">
                  {video.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
