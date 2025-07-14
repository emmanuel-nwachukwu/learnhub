"use client";

import { GoogleMap, useLoadScript, MarkerF } from "@react-google-maps/api";
import { useMemo } from "react";

const libraries: (
  | "places"
  | "drawing"
  | "geometry"
  | "localContext"
  | "visualization"
)[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "600px",
};

const center = {
  lat: 25.276987, //Dubai, UAE
  lng: 55.296249,
};

export default function MapPlayground() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  const markers = useMemo(
    () => [
      {
        id: 1,
        name: "My Custom Business",
        position: { lat: 25.276987, lng: 55.296249 },
        type: "restaurant",
      },
      {
        id: 2,
        name: "Another Place",
        position: { lat: 25.278, lng: 55.295 },
        type: "hospital",
      },
    ],
    []
  );

  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Google Maps Playground</h1>
      <GoogleMap mapContainerStyle={containerStyle} center={center} zoom={14}>
        {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={marker.position}
            icon={{
              url: getIcon(marker.type),
              scaledSize: new window.google.maps.Size(40, 40),
            }}
            title={marker.name}
          />
        ))}
      </GoogleMap>
    </div>
  );
}

// 🧠 Map business type to icons
function getIcon(type: string) {
  switch (type) {
    case "restaurant":
      return "https://maps.google.com/mapfiles/kml/shapes/dining.png";
    case "hospital":
      return "https://maps.google.com/mapfiles/kml/shapes/hospitals.png";
    default:
      return "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png";
  }
}
