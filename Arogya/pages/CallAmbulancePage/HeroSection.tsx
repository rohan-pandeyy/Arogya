"use client";
import React, { useState, useEffect } from "react";
import { ColourfulText } from "@/components/ui/colourful-text";
import { Input, Button } from "@heroui/react";
import { MapPinIcon } from "@heroicons/react/24/solid";

export default function HeroSection() {
  const [pickupLocation, setPickupLocation] = useState("");
  const [isLocating, setIsLocating] = useState(false);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Location detection is not supported by your browser.");
      return;
    }

    setIsLocating(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          // fetch address from openstreetmap's nominatim api
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`,
          );

          const data = await res.json();

          if (data && data.display_name) {
            setPickupLocation(data.display_name);
            setShowSuggestions(false);
          } else {
            setPickupLocation(
              `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
            );
          }
        } catch (error) {
          console.error("Reverse geocoding failed:", error);
          setPickupLocation(
            `Lat: ${latitude.toFixed(4)}, Lng: ${longitude.toFixed(4)}`,
          );
        }

        setIsLocating(false);
      },
      (error) => {
        console.error(error);
        alert("Unable to retrieve your location.");
        setIsLocating(false);
      },
    );
  };

  useEffect(() => {
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      if (pickupLocation.trim().length < 3) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(pickupLocation)}`,
          { signal: controller.signal },
        );

        const data = await res.json();
        const results = data.map((item: any) => item.display_name);
        setSuggestions(results.slice(0, 5));
      } catch (err) {
        if (err instanceof Error && err.name !== "AbortError") {
          console.error("Autocomplete error:", err.message);
        }
      }
    };

    const timeout = setTimeout(fetchSuggestions, 300);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [pickupLocation]);

  return (
    <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-gradient-to-b from-white to-green-100">
      <div className="w-11/12 md:h-[600px] flex items-center justify-start shadow-xl font-plusjakarta bg-green-100/10 rounded-3xl p-8 m-2">
        <div className="flex flex-col items-start">
          <p className="text-lg md:text-2xl text-left text-gray-500 z-2">
            In case of an emergency
          </p>
          <div className="flex flex-col gap-4">
            <h1 className="text-2xl md:text-5xl lg:text-7xl font-bold text-black relative z-2 text-left">
              Book an Ambulance
              <br />
              <ColourfulText text="with Arogya" />
            </h1>

            <div className="relative w-full sm:w-96">
              <Input
                label="Pickup location"
                type="text"
                value={pickupLocation}
                onChange={(e) => {
                  setPickupLocation(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => {
                  if (suggestions.length > 0) setShowSuggestions(true);
                }}
                onBlur={() => {
                  setTimeout(() => setShowSuggestions(false), 150);
                }}
                className="w-full z-0"
                endContent={
                  <div className="flex items-center gap-2 transition-all duration-200 ease-in-out">
                    {pickupLocation === "" ? (
                      isLocating ? (
                        <span className="text-gray-800 flex items-center">
                          <span className="w-5 h-5 border-2 border-t-transparent border-gray-800 rounded-full animate-spin" />
                        </span>
                      ) : (
                        <span
                          onClick={handleDetectLocation}
                          role="button"
                          tabIndex={0}
                          className="text-gray-700 hover:text-black cursor-pointer transition-opacity duration-200"
                          title="Detect current location"
                        >
                          <MapPinIcon className="w-6 h-6" />
                        </span>
                      )
                    ) : (
                      <span
                        onClick={() => setPickupLocation("")}
                        role="button"
                        tabIndex={0}
                        className="text-gray-700 cursor-pointer transition-opacity duration-200"
                        title="Clear input"
                      >
                        <svg
                          aria-hidden="true"
                          focusable="false"
                          height="1.5em"
                          role="presentation"
                          viewBox="0 0 24 24"
                          width="1.5em"
                        >
                          <path
                            d="M12 2a10 10 0 1010 10A10.016 10.016 0 0012 2zm3.36 12.3a.754.754 0 010 1.06.748.748 0 01-1.06 0l-2.3-2.3-2.3 2.3a.748.748 0 01-1.06 0 .754.754 0 010-1.06l2.3-2.3-2.3-2.3A.75.75 0 019.7 8.64l2.3 2.3 2.3-2.3a.75.75 0 011.06 1.06l-2.3 2.3z"
                            fill="currentColor"
                          ></path>
                        </svg>
                      </span>
                    )}
                  </div>
                }
              />

              {showSuggestions && suggestions.length > 0 && (
                <ul className="absolute z-10 mt-1 w-full bg-white border border-gray-300 rounded-md shadow-md max-h-52 overflow-y-auto">
                  {suggestions.map((suggestion, index) => (
                    <li
                      key={index}
                      onClick={() => {
                        setPickupLocation(suggestion);
                        setSuggestions([]);
                        setShowSuggestions(false);
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-sm"
                    >
                      {suggestion}
                    </li>
                  ))}
                </ul>
              )}
            </div>
            {/* will have to make custom database for "Dropoff hospital" and retrive suggestions from there */}
            <div className="flex w-full sm:w-96 flex-wrap md:flex-nowrap">
              <Input
                isClearable
                label="Dropoff hospital"
                type="address"
                className="z-0"
              />
            </div>

            <Button
              className="bg-gradient-to-tr from-slate-500 to-black text-white shadow-lg w-[70%] sm:w-36"
              radius="md"
            >
              Call Ambulance ➜
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
