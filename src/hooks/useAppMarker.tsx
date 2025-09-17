"use client";
import { useAdvancedMarkerRef } from "@vis.gl/react-google-maps";
import { useState } from "react";

export default function useAppMapMarker(marker?: any) {
  const [showBusiness, setShowBusiness] = useState(false);
  const [waves, setWaves] = useState(false);
  const [markerRef, advancedMarker] = useAdvancedMarkerRef();
  const handleClick = (onToggleWaves?: () => void) => {
    setShowBusiness((prev) => !prev);
    setWaves((prev) => !prev);

    // in case of inconsistencies
    if (waves !== showBusiness) {
      setShowBusiness(true);
      setWaves(true);
    }

    if (onToggleWaves) {
      onToggleWaves(); // toggle waves in parent
    }
  };

  return {
    marker,
    showBusiness,
    waves,
    markerRef,
    advancedMarker,
    handleClick,
  };
}
