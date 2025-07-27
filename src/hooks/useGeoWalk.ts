import { useState } from "react";
import { buildGoogleMapUrl } from "../utils/geoUtils";

type LatLng = {
  latitude: number;
  longitude: number;
};

/**
 * Custom hook to manage geolocation state and Google Maps walking route logic.
 */
export const useGeoWalk = (onError: () => void) => {
  // State to store the location value
  const [location, setLocation] = useState<LatLng | null>(null);

  /**
   * Fetches the user's current location using the Geolocation API.
   */
  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });
      },
      () => {
        onError();
      }
    );
  };

  /**
   * Opens a Google Maps route based on the current location.
   * @param walkDistance - Simulated walking distance in degrees.
   */
  const openGoogleMap = (walkDistance: number) => {
    if (!location) {
      onError();
      return;
    }
    const url = buildGoogleMapUrl(
      location.latitude,
      location.longitude,
      walkDistance
    );
    window.open(url);
  };

  return {
    getLocation,
    openGoogleMap,
  };
};
