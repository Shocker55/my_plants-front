import { useState, useEffect, useRef } from "react";
import { Loader } from "@googlemaps/js-api-loader";

export default function CreateMap({
  place,
  setPlace,
  latitude,
  setLatitude,
  longitude,
  setLongitude,
}) {
  const mapContainerRef = useRef(null);
  const inputRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  const defaultLatLng = {
    lat: latitude ? latitude : 35.7022589,
    lng: longitude ? longitude : 139.7744733,
  };

  useEffect(() => {
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

        // マーカーを追加
        const newMarker = new google.maps.Marker({
          map: newMap,
          position: defaultLatLng,
        });

        setMap(newMap);
        setMarker(newMarker);
        setGeocoder(new google.maps.Geocoder());
      })
      .catch((error) => {
        console.error("Error loading Google Maps:", error);
      });

    // コンポーネントがアンマウントされるときにマップとマーカーを破棄
    return () => {
      if (marker) {
        marker?.setMap(null);
      }
      if (map) {
        map?.setMap(null);
      }
    };
  }, []);

  const handleChange = () => {
    // 住所の自動補完を有効にする
    const input = inputRef.current;
    const autocomplete = new google.maps.places.Autocomplete(input, {
      componentRestrictions: { country: "jp" },
      fields: ["place_id", "geometry"],
    });
    autocomplete.bindTo("bounds", map);

    // 選択した場所が変更されたときの処理
    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place.geometry) {
        console.error("Place not found");
        return;
      }
      marker.setPosition(place.geometry.location);

      // マップの中心を選択した場所に設定
      map.setCenter(place.geometry.location);

      setPlace(input.value);
      setLatitude(place.geometry.location.lat());
      setLongitude(place.geometry.location.lng());
    });
  };

  return (
    <>
      <div className="mb-3 w-full">
        <input
          type="text"
          id="pac-input"
          defaultValue={place}
          onChange={handleChange}
          ref={inputRef}
          className="h-[26px] w-full border"
        />
      </div>
      <div className="flex justify-center">
        <div ref={mapContainerRef} className="h-[300px] w-[300px]" />
      </div>
    </>
  );
}
