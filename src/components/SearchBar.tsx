"use client";

import { useEffect, useRef } from "react";
import { useMapsLibrary } from "@vis.gl/react-google-maps";

// import { Dispatch, SetStateAction } from "react";

type SearchBarProps = {
  //   query: string;
  onQueryChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPlaceSelect: (place: google.maps.places.PlaceResult) => void;
  onEnter?: () => void;
  btnText?: string;
};

const SearchBar = ({
  //   query = "",
  onQueryChange,
  onPlaceSelect,
  onEnter,
  btnText = "",
}: SearchBarProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // load the "places" library safely
  const places = useMapsLibrary("places");
  //   console.log("places", places);

  //   useEffect(() => {
  //     if (!places || !inputRef.current) return;

  //     // initialize Autocomplete
  //     autocompleteRef.current = new places.Autocomplete(inputRef.current, {
  //       fields: ["geometry", "formatted_address", "name"],
  //       //   types: ["geocode"], // restrict to addresses
  //       types: [], // empty means all types
  //       componentRestrictions: { country: "ng" }, // 🇳🇬 restrict to Nigeria
  //     });

  //     // add listener for when user selects a suggestion
  //     autocompleteRef.current.addListener("place_changed", () => {
  //       // Wait a tick so Google finishes updating its internal state

  //       // const place = autocomplete.getPlace();
  //       const place = autocompleteRef.current?.getPlace();
  //       console.log(place);
  //       if (place) {
  //         onPlaceSelect(place);
  //       }
  //     });
  //   }, [places, onPlaceSelect]);

  useEffect(() => {
    if (!places || !inputRef.current) return;

    const autocomplete = new places.Autocomplete(inputRef.current, {
      fields: ["place_id", "geometry", "formatted_address", "name"],
      types: [],
      componentRestrictions: { country: "ng" },
    });

    const service = new places.PlacesService(document.createElement("div"));

    autocomplete.addListener("place_changed", () => {
      const selected = autocomplete.getPlace();

      if (selected?.place_id) {
        service.getDetails(
          {
            placeId: selected.place_id,
            fields: ["geometry", "formatted_address", "name"],
          },
          (result, status) => {
            if (
              status === google.maps.places.PlacesServiceStatus.OK &&
              result
            ) {
              console.log("Resolved place:", result);
              onPlaceSelect(result);
            }
          }
        );
      }
    });

    autocompleteRef.current = autocomplete;
  }, [places, onPlaceSelect]);

  return (
    <div className="flex items-center gap-4">
      <input
        ref={inputRef}
        type="text"
        // value={query}
        onChange={onQueryChange}
        onKeyDown={(e) => {
          if (e.key === "Enter" && onEnter) {
            onEnter();
          }
        }}
        className="bg-white py-1 rounded text-black
                    px-2 border-black focus:border-green-700
                    outline-none border-2 shadow-lg"
      />

      {btnText && btnText.length > 0 && (
        <button
          onClick={onEnter}
          className="bg-green-600 text-white py-1 px-4
                            rounded cursor-pointer border-green-600">
          {btnText}
        </button>
      )}
    </div>
  );
};

export default SearchBar;
