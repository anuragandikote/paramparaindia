"use client";

import { useState } from "react";

export default function FloatingVideo() {
  const [visible, setVisible] = useState(true);

  if (!visible) return null;

  return (
    <div className="fixed bottom-5 right-5 z-[9999] w-[180px] h-[320px] md:w-[200px] md:h-[360px] rounded-2xl overflow-hidden bg-black shadow-2xl">
      {/* Close Button */}
      <button
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 z-10 w-7 h-7 rounded-full bg-black/60 text-white flex items-center justify-center text-sm hover:bg-black/80"
        aria-label="Close video"
      >
        ✕
      </button>

      {/* Video */}
      <video
        src="/videos/all-in-one-english.mp4"  // place your video here
        autoPlay
        muted
        loop
        playsInline
        className="w-full h-full object-cover"
      />
    </div>
  );
}
