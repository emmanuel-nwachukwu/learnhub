"use client";

// import mapMarkers from "@/app/mock/MapMarkers";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  Libraries,
  Autocomplete,
  InfoWindowF,
} from "@react-google-maps/api";
import { useEffect, useState, useRef } from "react";

// type BusinessType =
//   | "restaurant"
//   | "hospital"
//   | "school"
//   | "store"
//   | "bank"
//   | "default";
type MarkerData = {
  id: number;
  name: string;
  // position: google.maps.LatLngLiteral; still valid
  position: { lat: number; lng: number };
  type: string;
  label?: string;
};

const libraries: Libraries = ["places"];

// const libraries: (
//   | "places"
//   | "drawing"
//   | "geometry"
//   | "localContext"
//   | "visualization"
// )[] = ["places"];

const containerStyle = {
  width: "100%",
  height: "600px",
};

const defaultCenter = {
  lat: 6.52875, //Lagos, Nigeria
  lng: 3.3524,
  // lat: 6.52143320463954, //Lagos, Nigeria
  // lng: 3.3651294660031583,
};

export default function MapPlayground() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
    libraries,
  });

  // ✅ Ensure we're mounted before rendering (solves hydration issues)
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const [center, setCenter] = useState(defaultCenter);
  const [markers, setMarkers] = useState<MarkerData[]>([
    {
      id: 1,
      name: "Mushin Main Market",
      position: defaultCenter,
      type: "shopping",
    },
  ]);
  // const [markers, setMarkers] = useState<any[]>(mapMarkers);

  const [selectedMarker, setSelectedMarker] = useState<MarkerData | null>(null);
  const [addingPosition, setAddingPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [formData, setFormData] = useState({ name: "", type: "restaurant" });

  const autoCompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // const markers: MarkerData[] = useMemo(
  //   () => [
  //     {
  //       id: 1,
  //       name: "My Custom Business",
  //       position: { lat: 25.276987, lng: 55.296249 },
  //       type: "restaurant",
  //     },
  //     {
  //       id: 2,
  //       name: "Another Place",
  //       position: { lat: 25.278, lng: 55.295 },
  //       type: "hospital",
  //     },
  //   ],
  //   []
  // );

  // 🧠 Map business type to icons
  const onPlaceChanged = () => {
    if (autoCompleteRef.current !== null) {
      const place = autoCompleteRef.current.getPlace();

      if (!place.geometry || !place.geometry.location) return;

      console.log("Google Place Types:", place.types);
      const newMarker: MarkerData = {
        id: Date.now(),
        name: place.name || "unknown",
        position: {
          lat: place.geometry.location.lat(),
          lng: place.geometry.location.lng(),
        },
        type: place.types?.[0] || "default",
      };

      setMarkers((prev) => [...prev, newMarker]);
      setCenter(newMarker.position);
    }
  };

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    setAddingPosition({
      lat: e.latLng.lat(),
      lng: e.latLng.lng(),
    });
    setSelectedMarker(null); // Close any open info window
  };

  const handleAddMarker = () => {
    // setAddingPosition(null);
    const newMarker = {
      id: Date.now(),
      name: formData.name || "Unnamed Place",
      position: addingPosition!,
      type: formData.type,
    };

    setMarkers((prev) => [...prev, newMarker]);
    setCenter(newMarker.position);
    setAddingPosition(null);
    setFormData({ name: "", type: "restaurant" }); // resets after using current input
  };

  // const icons = useMemo(() => {
  //   if (!isLoaded || typeof window === "undefined") return {};

  //   const scaledSize = new window.google.maps.Size(20, 20);
  //   return {
  //     restaurant: {
  //       url: "https://maps.google.com/mapfiles/kml/shapes/dining.png",
  //       scaledSize,
  //     },
  //     hospital: {
  //       url: "https://maps.google.com/mapfiles/kml/shapes/hospitals.png",
  //       scaledSize,
  //     },
  //     default: {
  //       url: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
  //       scaledSize,
  //     },
  //   };
  // }, [isLoaded]);

  // ✅ Return null until we’re mounted
  if (!mounted) return <div>Preparing map...</div>;
  if (loadError) return <div>Map failed to load</div>;
  if (!isLoaded) return <div>Loading map...</div>;

  return (
    <div className="p-4 max-w-3xl w-full">
      <h1 className="text-xl font-bold mb-4">Google Maps Playground</h1>
      <div className="mb-4">
        <Autocomplete
          onLoad={(Autocomplete) => (autoCompleteRef.current = Autocomplete)}
          onPlaceChanged={onPlaceChanged}>
          <input
            type="text"
            placeholder="Search for a place..."
            ref={inputRef}
            className="p-2 border border-gray-300 rounded w-full max-w-md"
          />
        </Autocomplete>
      </div>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={center}
        zoom={14}
        onClick={handleMapClick}>
        {markers.map((marker) => (
          <MarkerF
            key={marker.id}
            position={marker.position}
            // icon={icons[marker.type] || icons.default}
            icon={{
              url: getIcon(marker.type),
              scaledSize: new window.google.maps.Size(20, 20),
            }}
            title={marker.name}
            onClick={() => setSelectedMarker(marker)}
          />
        ))}

        {selectedMarker && (
          <InfoWindowF
            position={selectedMarker.position}
            onCloseClick={() => setSelectedMarker(null)}>
            <div className="text-sm">
              <p className="font-semibold text-black">{selectedMarker.name}</p>
              <p className="text-gray-600">
                Type: {selectedMarker.type.replaceAll("_", " ")}
              </p>
            </div>
          </InfoWindowF>
        )}

        {addingPosition && (
          <InfoWindowF
            position={addingPosition}
            onCloseClick={() => setAddingPosition(null)}>
            <div className="space-y-2 text-sm text-gray-900">
              <h3>Business Information</h3>
              <input
                type="text"
                placeholder="Business name"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                className="p-1 border border-gray-300 rounded w-full"
              />
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, type: e.target.value }))
                }
                className="p-1 border border-gray-300 rounded w-full">
                <option value="restaurant">Restaurant</option>
                <option value="hospital">Hospital</option>
                <option value="school">School</option>
                <option value="store">Store</option>
                <option value="bank">Bank</option>
              </select>

              <button
                onClick={handleAddMarker}
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600">
                Add Marker
              </button>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}

// 🧠 Business Type to Icon URL
// function getIcon(type: string) {
//   switch (type) {
//     case "restaurant":
//       return "https://maps.google.com/mapfiles/kml/shapes/dining.png";
//     case "hospital":
//       return "https://maps.google.com/mapfiles/kml/shapes/hospitals.png";
//     case "school":
//       return "https://maps.google.com/mapfiles/kml/shapes/schools.png";
//     case "shopping":
//       return "https://maps.google.com/mapfiles/kml/shapes/shopping.png";
//     case "convenience":
//       return "https://maps.google.com/mapfiles/kml/shapes/convenience.png";
//     case "grocery":
//       return "https://maps.google.com/mapfiles/kml/shapes/grocery.png";
//     case "bank":
//       return "https://maps.google.com/mapfiles/kml/shapes/banks.png";
//     case "parking":
//       return "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png";
//     case "coffee":
//       return "https://maps.google.com/mapfiles/kml/shapes/coffee.png";
//     case "fire dept":
//       return "https://maps.google.com/mapfiles/kml/shapes/firedept.png";
//     case "police":
//       return "https://maps.google.com/mapfiles/kml/shapes/police.png";
//     case "golf course":
//       return "https://maps.google.com/mapfiles/kml/shapes/golf.png";
//     case "park":
//       return "https://maps.google.com/mapfiles/kml/shapes/parks.png";
//     case "museum":
//       return "https://maps.google.com/mapfiles/kml/shapes/museum_maps.png";
//     case "pharmacy":
//       return "https://maps.google.com/mapfiles/kml/shapes/pharmacy_rx.png";
//     case "train-station":
//       return "https://maps.google.com/mapfiles/kml/shapes/rail.png";
//     case "bus-stop":
//       return "https://maps.google.com/mapfiles/kml/shapes/bus.png";
//     case "ferry":
//       return "https://maps.google.com/mapfiles/kml/shapes/ferry.png";
//     case "red-pin":
//       return "https://maps.google.com/mapfiles/ms/icons/red-dot.png";
//     case "teardrop":
//       return "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png";
//     case "current-location":
//       return "https://maps.gstatic.com/mapfiles/api-3/images/blue_dot.png";
//     default:
//       return "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png";
//   }
// }

function getIcon(type: string) {
  const normalizedType = type.toLowerCase();

  const iconMap: Record<string, string> = {
    restaurant: "https://maps.google.com/mapfiles/kml/shapes/dining.png",
    hospital: "https://maps.google.com/mapfiles/kml/shapes/hospitals.png",
    school: "https://maps.google.com/mapfiles/kml/shapes/schools.png",
    shopping: "https://maps.google.com/mapfiles/kml/shapes/shopping.png",
    convenience_store:
      "https://maps.google.com/mapfiles/kml/shapes/convenience.png",
    grocery_or_supermarket:
      "https://maps.google.com/mapfiles/kml/shapes/grocery.png",
    bank: "https://maps.google.com/mapfiles/kml/shapes/banks.png",
    parking: "https://maps.google.com/mapfiles/kml/shapes/parking_lot_maps.png",
    cafe: "https://maps.google.com/mapfiles/kml/shapes/coffee.png",
    fire_station: "https://maps.google.com/mapfiles/kml/shapes/firedept.png",
    police: "https://maps.google.com/mapfiles/kml/shapes/police.png",
    park: "https://maps.google.com/mapfiles/kml/shapes/parks.png",
    museum: "https://maps.google.com/mapfiles/kml/shapes/museum_maps.png",
    pharmacy: "https://maps.google.com/mapfiles/kml/shapes/pharmacy_rx.png",
    train_station: "https://maps.google.com/mapfiles/kml/shapes/rail.png",
    bus_station: "https://maps.google.com/mapfiles/kml/shapes/bus.png",
    ferry_terminal: "https://maps.google.com/mapfiles/kml/shapes/ferry.png",
    point_of_interest: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
    establishment:
      "https://maps.gstatic.com/mapfiles/api-3/images/spotlight-poi2.png",
    route: "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png",
    lodging: "https://maps.google.com/mapfiles/kml/shapes/lodging.png",
  };

  return (
    iconMap[normalizedType] ||
    "https://maps.google.com/mapfiles/kml/shapes/info-i_maps.png"
  );
}
