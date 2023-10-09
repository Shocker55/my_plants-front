import React, { useState, useEffect } from "react";
// import GoogleMapReact from "google-map-react";
import { Loader } from "@googlemaps/js-api-loader";

export default function CreateMap({ place, setPlace, setLatitude, setLongitude }) {
  const [map, setMap] = useState(null);
  const [geocoder, setGeocoder] = useState(null);

  const defaultLatLng = {
    lat: 35.7022589,
    lng: 139.7744733,
  };

  const loader = new Loader({
    apiKey: process.env.NEXT_PUBLIC_GOOGLE_MAP_KEY,
    version: "weekly",
    region: "JP",
    language: "ja",
    libraries: ["places"],
  });

  useEffect(() => {
    loader.load().then((google) => {
      const map = new google.maps.Map(document.getElementById("map"), {
        center: defaultLatLng,
        zoom: 17,
      });

      setMap(map);
      setGeocoder(new google.maps.Geocoder());

      // マーカーを追加
      new google.maps.Marker({
        map: map,
        position: defaultLatLng,
      });

      // 住所の自動補完を有効にする
      const input = document.getElementById("pac-input");
      const autocomplete = new google.maps.places.Autocomplete(input, {
        componentRestrictions: { country: "jp" },
      });
      autocomplete.bindTo("bounds", map);

      // 選択した場所が変更されたときの処理
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();

        if (!place.geometry) {
          console.error("Place not found");
          return;
        }

        // マップの中心を選択した場所に設定
        map.setCenter(place.geometry.location);

        // マーカーを設定
        new google.maps.Marker({
          map: map,
          position: place.geometry.location,
        });

        setPlace(
          `${place.formatted_address?.replace(/^〒\d{3}-\d{4}\s/, "")}` + " " + `${place.name}`
        );
        setLatitude(place.geometry.location.lat());
        setLongitude(place.geometry.location.lng());
      });
    });
  }, []);

  return (
    <>
      <div className="mb-3 w-full">
        <input type="text" id="pac-input" className="h-[26px] w-full border" />
      </div>
      <div className="flex justify-center">
        <div id="map" className="h-[300px] w-[300px]">
          <div>Load Dynamic Map</div>
        </div>
      </div>
    </>
  );
}
