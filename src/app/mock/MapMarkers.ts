import type { Marker } from "@/lib/types/mapTypes";

const mapMarkers: Marker[] = [
  {
    position: { lat: 6.5244, lng: 3.3792 },
    // type: "icon",
    waves: false,
    data: {
      type: "petrol-station",
    },
  },

  {
    position: { lat: 6.5208, lng: 3.3721 },
    // type: "icon",
    waves: false,
    data: {
      type: "restaurant",
    },
  },

  {
    position: { lat: 6.5267, lng: 3.3902 },
    // type: "icon",
    waves: false,
    data: {
      type: "car-wash",
    },
  },

  {
    position: { lat: 6.5189, lng: 3.3775 },
    // type: "icon",
    waves: true,
    data: {
      type: "library",
    },
  },
  {
    position: { lat: 6.5322, lng: 3.381 },
    // type: "icon",
    waves: false,
    data: {
      type: "hotel",
    },
  },

  {
    position: { lat: 6.5231, lng: 3.3867 },
    // type: "icon",
    waves: false,
    data: {
      type: "delivery",
    },
  },
].map((marker) => ({
  ...marker,
  data: {
    ...marker.data,
    business: {
      name: "Kilimajaro",
      location: "Federal Housing Estate, Road",
      isOpen: true,
      rating: 3,
      reviewsCount: 198,
      isBookmarked: false,
      images: Array(5).fill({
        width: 900,
        height: 800,
        src: `/18.jpeg`,
      }),
    },
  },
}));

export default mapMarkers;
