"use client";

import { cn } from "@/lib/utils";
import AppAdvancedMarker from "./AppAdvancedMarker";
import type { Marker, BusinessTypeKey } from "@/lib/types/mapTypes";
import { ComponentType } from "react";

import { BiCar, BiDish } from "react-icons/bi";
import {
  HiOutlineCube,
  HiOutlineHome,
  HiOutlineTruck,
  HiOutlineTv,
} from "react-icons/hi2";
import { PiGasPump } from "react-icons/pi";
import { TiTags } from "react-icons/ti";
import useAppMapMarker from "@/hooks/useAppMarker";

type BusinessTypeConfig = {
  icon: ComponentType<{ className?: string }>;
  className: string;
};

const businessTypes: Record<BusinessTypeKey, BusinessTypeConfig> = {
  restaurant: { icon: BiDish, className: "bg-gray-800" },
  "car-wash": { icon: BiCar, className: "bg-purple-500" },
  delivery: { icon: HiOutlineCube, className: "bg-rose-500" },
  "tech-shop": { icon: HiOutlineTv, className: "bg-green-500" },
  mover: { icon: HiOutlineTruck, className: "bg-rose-500" },
  "petrol-station": { icon: PiGasPump, className: "bg-red-500" },
  hotel: { icon: HiOutlineHome, className: "bg-blue-500" },
  library: { icon: TiTags, className: "bg-orange-500" },
};

type IconMarkerProps = {
  marker: Marker;
  onClick?: () => void;
};

export default function IconMarker({ marker, onClick }: IconMarkerProps) {
  const businessType = businessTypes[marker.data.type];
  const Icon = businessType.icon;

  const { waves, handleClick } = useAppMapMarker(marker);
  // console.log(waves);

  return (
    <AppAdvancedMarker
      marker={marker}
      className="relative"
      onClick={() => handleClick(onClick)}>
      {waves && (
        <div
          className={cn(
            "absolute",
            "inset-0",
            "scale-[2]",
            "opacity-30",
            "rounded-full",
            "aspect-square",
            businessType.className
          )}
        />
      )}
      <span
        className={cn(
          "mb-2",
          "relative inline-flex",
          "p-1 bg-white rounded-full shadow-2xl",
          "before:absolute",
          "before:border-[8px] before:border-transparent before:border-t-white",
          "before:left-0 before:right-0",
          "before:mx-auto before:w-2",
          "before:-mt-0.5",
          "before:top-full"
        )}>
        <span
          className={cn("p-2 text-white rounded-full", businessType.className)}>
          <Icon className="w-5 h-5" />
        </span>
      </span>
    </AppAdvancedMarker>
  );
}
