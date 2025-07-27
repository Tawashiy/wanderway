import { useState, useEffect } from "react";
import { ErrorDialog } from "./components/ErrorDialog";
import { useGeoWalk } from "./hooks/useGeoWalk";

function App() {
  // State to store the distance value (can be null initially)
  const [distance, setDistance] = useState<number | null>(null);

  // State to control the visibility of an error modal
  const [isErrorOpen, setIsErrorOpen] = useState(false);

  // Initialize geolocation hooks
  const { getLocation, openGoogleMap } = useGeoWalk(() => setIsErrorOpen(true));

  // Call getLocation once to get the user's current location
  useEffect(() => {
    getLocation();
  }, []);

  // Handler function to open Google Maps if distance is valid
  const handleMap = async () => {
    // If distance is null, show error and stop execution
    if (distance == null) {
      setIsErrorOpen(true);
      return;
    }

    // Try to open Google Maps with the distance; if it fails, show error
    openGoogleMap(distance);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#ffdcb5] to-[#a5c4f7] flex flex-col items-center justify-center px-4 py-10 text-gray-900">
      <div className="w-full max-w-md bg-white rounded-3xl shadow-lg p-6 space-y-8">
        <div className="text-center">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-[#3374e0] tracking-tight">
            WanderWay
          </h1>
          <p className="mt-2 text-sm text-[#9d5987]">
            Choose your walking distance.
          </p>
          <p className="mt-1 text-xs text-[#9d5987]">
            A random walking route will be generated for your chosen distance.
          </p>
        </div>
        <div className="space-y-3">
          {[0.0025, 0.005, 0.01].map((d, i) => (
            <button
              key={d}
              onClick={() => setDistance(d)}
              className={`w-full py-3 rounded-xl text-base font-medium transition 
            ${
              distance === d
                ? "bg-[#dd822f] text-white shadow-md"
                : "bg-white border border-[#9d5987] text-[#9d5987] hover:bg-[#fef7f3] hover:shadow"
            }`}
            >
              {["0.5 km (10 min)", "3.0 km (30 min)", "5.0 km (1 hr)"][i]}
            </button>
          ))}
        </div>

        <button
          onClick={handleMap}
          disabled={distance == null}
          className={`w-full py-3 rounded-xl font-semibold text-white mt-6 transition 
        ${
          distance == null
            ? "bg-gray-300 text-gray-400 cursor-not-allowed"
            : "bg-[#3374e0] hover:bg-[#2c63c3] shadow-md"
        }
      `}
        >
          Open Route in Map
        </button>
      </div>

      {isErrorOpen && <ErrorDialog onClose={() => setIsErrorOpen(false)} />}
    </div>
  );
}

export default App;
