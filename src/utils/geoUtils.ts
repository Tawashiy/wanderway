// Builds a Google Maps URL showing a walking route starting and ending at the given coordinates,
// including a randomized path within the specified walking distance.
export const buildGoogleMapUrl = (
  latitude: number,
  longitude: number,
  walkDistance: number
): string => {
  // Define the starting point as a string "lat,lng"
  const origin = `${latitude},${longitude}`;

  // Generate a random path around the origin within the walking distance
  const path = generateRandomPath(latitude, longitude, walkDistance);

  // Construct and return the Google Maps directions URL with the origin, path waypoints, and origin as the destination
  return `https://www.google.com/maps/dir/${origin}/${path.join(
    "/"
  )}/${origin}/@${origin},14z/data=!4m5!4m4!1m1!4e1!1m0!3e2?hl=en`;
};

// Generates a random path of waypoints around the given latitude and longitude,
// by moving in one of four random directional patterns within the specified walkDistance.
const generateRandomPath = (
  latitude: number,
  longitude: number,
  walkDistance: number
): string[] => {
  // Define type alias for latitude and longitude tuple
  type LatLng = [number, number];

  // Possible directions to create a triangular path around the start point
  const directions: LatLng[][] = [
    [
      [-1, 0],
      [-1, -1],
      [0, -1],
    ], // northwest triangle
    [
      [0, -1],
      [1, -1],
      [1, 0],
    ], // northeast triangle
    [
      [1, 0],
      [1, 1],
      [0, 1],
    ], // southeast triangle
    [
      [0, 1],
      [-1, 1],
      [-1, 0],
    ], // southwest triangle
  ];

  // Pick a random directional pattern
  const randomDir = directions[Math.floor(Math.random() * directions.length)];

  // Map each direction point to a new coordinate offset by walkDistance plus a small random offset
  return randomDir.map(([latSign, lngSign]) => {
    const newLat = latitude + latSign * walkDistance + getRandomOffset();
    const newLng = longitude + lngSign * walkDistance + getRandomOffset();
    return `${newLat},${newLng}`;
  });
};

// Returns a small random offset to add variability to the path points
const getRandomOffset = (): number => {
  return Math.random() * 0.003 - 0.0015; // Random number between -0.0015 and +0.0015
};
