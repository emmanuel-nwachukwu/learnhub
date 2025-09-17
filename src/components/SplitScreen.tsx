/* eslint-disable @next/next/no-img-element */
"use client";

export default function SplitScreen() {
  return (
    <div className="h-[90vh] relative ">
      <div className="absolute w-2/3 h-full bg-[url('/29.jpeg')] bg-cover bg-center  z-0 ">
        {/* <div className=" w-2/4 h-full bg-[url('/29.jpeg')] bg-cover bg-center"></div>
        <div className=" w-1/4 "></div> */}
      </div>
      <div className="absolute right-0 w-2/3 h-full bg-[url('/18.jpeg')] bg-cover bg-center z-10 mask-right">
        Hello
      </div>
    </div>
  );
}
