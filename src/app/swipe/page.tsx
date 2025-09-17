"use client";

import { useRef } from "react";

export default function SwipeBox() {
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX.current;

    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        console.log("👈 Swipe Left");
      } else {
        console.log("👉 Swipe Right");
      }
    } else {
      console.log("Swipe too short");
    }
  };

  return (
    <div
      className="w-full h-64 bg-blue-300 flex items-center justify-center text-white text-xl select-none touch-none"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}>
      Swipe Here 👆 (on a mobile device)
    </div>
  );
}
