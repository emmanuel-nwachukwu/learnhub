export type Business = {
  name: string;
  location?: string;
  isOpen?: boolean;
  rating?: number;
  reviewsCount?: number;
  isBookmarked?: boolean;
  images?: { width: number; height: number; src?: string }[];
};

export type BusinessTypeKey =
  | "restaurant"
  | "car-wash"
  | "delivery"
  | "tech-shop"
  | "mover"
  | "petrol-station"
  | "hotel"
  | "library";

export type MarkerData = {
  type: BusinessTypeKey;
  business?: Business; // make optional to cover both cases
};

export type Marker = {
  position: { lat: number; lng: number };
  // type?: string;
  data: MarkerData;
  waves?: boolean;
};
