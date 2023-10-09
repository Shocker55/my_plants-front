import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function Map({ latitude, longitude }) {
  console.log(latitude);

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

    loader.load().then((google) => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLatLng,
        zoom: 17,
      });

      // マーカーを追加
      new google.maps.Marker({
        map: map,
        position: defaultLatLng,
      });
    });
  }, []);

  return (
    <div id="map" className="h-[300px] w-[300px]">
      <div>Load Dynamic Map</div>
    </div>
  );
}
