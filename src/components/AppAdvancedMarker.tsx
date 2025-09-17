"use client";

import { AdvancedMarker, AdvancedMarkerProps } from "@vis.gl/react-google-maps";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

import InfoWindowBusinessCard from "./InfoWindowBusinessCard";
import useAppMapMarker from "@/hooks/useAppMarker";

import type { Marker } from "@/lib/types/mapTypes";

type AppAdvancedMarkerProps = AdvancedMarkerProps & {
  marker: Marker;
  children?: ReactNode;
  onClick?: () => void;
};

export default function AppAdvancedMarker({
  marker,
  children,
  onClick,
  ...props
}: AppAdvancedMarkerProps) {
  const { showBusiness, markerRef, advancedMarker, handleClick, waves } =
    useAppMapMarker();
  // console.log(waves);

  return (
    <>
      <AdvancedMarker
        {...props}
        onClick={() => handleClick(onClick)}
        position={marker.position}
        ref={markerRef}
        className={cn("relative", props.className)}>
        {children}
      </AdvancedMarker>
      {showBusiness && waves && marker.data.business ? (
        <InfoWindowBusinessCard
          headerDisabled
          anchor={advancedMarker}
          onClose={handleClick}
        />
      ) : null}
    </>
  );
}
