/**
 * Attempts to get the user's current location and opens a walking route
 * on Google Maps based on the given walking distance.
 * @param walkDistance - Distance in degrees to simulate walk path (e.g., ~0.001 = ~100m)
 * @param onError - Callback to execute if geolocation fails
 */
export const openGoogleMap = (walkDistance: number, onError: () => void) => {
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      const { latitude, longitude } = pos.coords;
      const url = buildGoogleMapUrl(latitude, longitude, walkDistance);
      window.open(url);
    },
    () => {
      onError();
    }
  );
};

/**
 * Builds a Google Maps directions URL that simulates a circular walk path
 * starting and ending at the user's current location.
 * @param latitude - Starting latitude
 * @param longitude - Starting longitude
 * @param walkDistance - Simulated walking distance (in degrees)
 * @returns Google Maps URL string
 */
const buildGoogleMapUrl = (
  latitude: number,
  longitude: number,
  walkDistance: number
): string => {
  const origin = `${latitude},${longitude}`;
  const path = generateRandomPath(latitude, longitude, walkDistance);

  return `https://www.google.com/maps/dir/${origin}/${path.join(
    "/"
  )}/${origin}/@${origin},14z/data=!4m5!4m4!1m1!4e1!1m0!3e2?hl=en`;
};

/**
 * Generates a pseudo-random circular path around the user's location.
 * This creates 3 waypoints in one of 4 general directions to simulate movement.
 * @param latitude - Starting latitude
 * @param longitude - Starting longitude
 * @param walkDistance - Distance multiplier to spread points
 * @returns An array of LatLng strings (e.g., "35.1234,139.1234")
 */
const generateRandomPath = (
  latitude: number,
  longitude: number,
  walkDistance: number
): string[] => {
  type LatLng = [number, number];
  const directions: LatLng[][] = [
    [
      [-1, 0],
      [-1, -1],
      [0, -1],
    ], // down-left
    [
      [0, -1],
      [1, -1],
      [1, 0],
    ], // left-up
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ], // up-right
    [
      [0, 1],
      [-1, 1],
      [-1, 0],
    ], // right-down
  ];

  const randomDir = directions[Math.floor(Math.random() * directions.length)];

  return randomDir.map(([latSign, lngSign]) => {
    const newLat = latitude + latSign * walkDistance + getRandomOffset();
    const newLng = longitude + lngSign * walkDistance + getRandomOffset();
    return `${newLat},${newLng}`;
  });
};

/**
 * Generates a small random offset between -0.0015 and +0.0015.
 * Helps to make the generated path look more natural.
 */
const getRandomOffset = (): number => {
  return Math.random() * 0.003 - 0.0015;
};
