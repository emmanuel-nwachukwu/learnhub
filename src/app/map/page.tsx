"use client";

// import dynamic from "next/dynamic";

import MapPlayground from "@/components/MapPlayground";

//prevent SSR on map

// const MapPlayground = dynamic(() => import("@/components/MapPlayground"), {
//   ssr: false,
// });

export default function Maps() {
  return <MapPlayground />;
}
