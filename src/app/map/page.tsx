"use client";

// import dynamic from "next/dynamic";

// import MapPlayground from "@/components/MapPlayground";
import SearchBar from "@/components/SearchBar";
import VisMapPlayground from "@/components/VisMapPlayground";
import { debounce } from "@/lib/searchDebounce";
import { APIProvider } from "@vis.gl/react-google-maps";
import { useState } from "react";

//prevent SSR on map

// const MapPlayground = dynamic(() => import("@/components/MapPlayground"), {
//   ssr: false,
// });

export default function Maps() {
  const API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!;

  const [query, setQuery] = useState("");
  const [center, setCenter] = useState<google.maps.LatLngLiteral | null>(null);

  // const handleSearch = () => {
  //   console.log("Search triggered for:", query);
  // };
  const handlePlaceSelect = (place: google.maps.places.PlaceResult) => {
    if (place.geometry?.location) {
      const location = place.geometry.location;
      setCenter({ lat: location.lat(), lng: location.lng() });
      setQuery(place.formatted_address || place.name || "");
    }
  };

  // ✅ Debounced search for free text queries
  const searchByText = debounce((input: string) => {
    if (!input) return;

    const service = new google.maps.places.PlacesService(
      document.createElement("div")
    );

    service.textSearch({ query: input }, (results, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        results &&
        results.length > 0
      ) {
        const first = results[0];
        if (first.geometry?.location) {
          const newCenter = {
            lat: first.geometry.location.lat(),
            lng: first.geometry.location.lng(),
          };
          setCenter(newCenter);
          setQuery(first.formatted_address || first.name || input);
        }
      }
    });
  }, 500);

  return (
    <APIProvider apiKey={API_KEY} libraries={["places"]}>
      <div className="text-center flex flex-col items-center justify-center">
        {/* <MapPlayground /> */}

        <h1 className="text-xl font-bold my-4">Google Maps Playground</h1>

        <SearchBar
          // query={query}
          onQueryChange={(e) => setQuery(e.target.value)}
          onPlaceSelect={handlePlaceSelect}
          // onEnter={handleSearch}
          onEnter={() => searchByText(query)} // ✅ Press Enter triggers text search
          btnText="Search"
        />
        <VisMapPlayground center={center} onCenterChange={setCenter} />
      </div>
    </APIProvider>
  );
}
