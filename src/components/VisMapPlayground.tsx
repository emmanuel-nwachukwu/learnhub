"use client";
import mapMarkers from "@/app/mock/MapMarkers";
import { Map } from "@vis.gl/react-google-maps";
import IconMarker from "./IconMarker";
import { useState } from "react";
import { Marker } from "@/lib/types/mapTypes";
// import { useEffect, useState } from "react";

interface VisMapPlaygroundProps {
  mapProps?: Record<string, any>; // pass-through for <Map>
  searchQuery?: string; // the query to search for (e.g., "restaurants in Lagos")
  center?: google.maps.LatLngLiteral | null;
  onCenterChange: (center: { lat: number; lng: number }) => void;
}

const VisMapPlayground = ({
  mapProps = {},
  // searchQuery,
  center = { lat: 6.5244, lng: 3.3792 },
  onCenterChange,
}: VisMapPlaygroundProps) => {
  // const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;
  const MAP_ID = process.env.NEXT_PUBLIC_GOOGLE_MAPS_ID!;
  const [markers, setMarkers] = useState<Marker[]>(mapMarkers);

  // const handleMarkerClick = (index: number) => {
  //   setMarkers((prev) =>
  //     prev.map((marker, i) => ({
  //       ...marker,
  //       waves: i === index ? !marker.waves : false, // toggle clicked, reset others
  //     }))
  //   );
  // };
  // const [center, setCenter] = useState({ lat: 6.5244, lng: 3.3792 }); // default: Lagos
  // const [place, setPlace] = useState<google.maps.places.PlaceResult | null>(
  //   null
  // );

  // useEffect(() => {
  //   if (!searchQuery) return;

  //   const service = new google.maps.places.PlacesService(
  //     document.createElement("div")
  //   );

  //   service.findPlaceFromQuery(
  //     {
  //       query: searchQuery,
  //       fields: ["name", "geometry", "formatted_address"],
  //     },
  //     (results, status) => {
  //       if (
  //         status === google.maps.places.PlacesServiceStatus.OK &&
  //         results &&
  //         results[0]
  //       ) {
  //         setPlace(results[0]);
  //         if (results[0].geometry?.location) {
  //           setCenter({
  //             lat: results[0].geometry.location.lat(),
  //             lng: results[0].geometry.location.lng(),
  //           });
  //         }
  //       }
  //     }
  //   );
  // }, [searchQuery]);

  return (
    <div className="p-4 max-w-3xl w-full">
      <div style={{ height: "80vh", width: "100%" }}>
        <Map
          // defaultCenter={center}
          defaultCenter={{ lat: 6.5244, lng: 3.3792 }}
          defaultZoom={15}
          center={center}
          disableDefaultUI={true}
          gestureHandling="greedy"
          onCenterChanged={(ev) => {
            const c = ev.detail.center;
            onCenterChange({ lat: c.lat, lng: c.lng }); // ✅ bubble to parent
          }}
          mapId={MAP_ID} // Optional: use custom map styling
          {...mapProps}>
          {/* ✅ Marker at selected location */}
          {/* {center && <Marker position={center} />} */}

          {markers.map((marker, idx) => (
            <IconMarker
              key={idx}
              marker={marker}
              // onClick={() => handleMarkerClick(idx)}
            />
          ))}
        </Map>
      </div>
    </div>
  );
};

export default VisMapPlayground;
