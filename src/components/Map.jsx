import { useEffect, useRef, useState } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map({ latitude, longitude }) {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  useEffect(() => {
    const defaultLatLng = {
      lat: parseFloat(latitude),
      lng: parseFloat(longitude),
    };

    const loader = new Loader({
      apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
      version: "weekly",
      region: "JP",
      language: "ja",
      libraries: ["places"],
    });

    loader
      .load()
      .then((google) => {
        const newMap = new google.maps.Map(mapContainerRef.current, {
          center: defaultLatLng,
          zoom: 17,
        });

        const newMarker = new google.maps.Marker({
          map: newMap,
          position: defaultLatLng,
        });

        setMap(newMap);
        setMarker(newMarker);
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });

    // コンポーネントがアンマウントされるときにマップとマーカーを破棄
    return () => {
      if (marker) {
        marker.setMap(null);
      }
      if (map) {
        map.setMap(null);
      }
    };
  }, [latitude, longitude]);

  return <div ref={mapContainerRef} className="h-[300px] w-[300px]" />;
}
