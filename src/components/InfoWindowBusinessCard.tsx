"use client";

import { InfoWindow, InfoWindowProps } from "@vis.gl/react-google-maps";
import BusinessCard from "./BusinessCard";

type Business = {
  name: string;
  location: string;
  isOpen: boolean;
  rating: number;
  reviewsCount: number;
  isBookmarked: boolean;
  images: { width: number; height: number; src?: string }[];
};

type InfoWindowBusinessCardProps = InfoWindowProps & {
  business?: Business;
};

export default function InfoWindowBusinessCard({
  ...props
}: InfoWindowBusinessCardProps) {
  return (
    <InfoWindow {...props} headerDisabled>
      <div className="max-w-64">
        <BusinessCard />
      </div>
    </InfoWindow>
  );
}
