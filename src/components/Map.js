import { useEffect, useRef, useContext } from "react";
import React from "react";
import locations from "../restaurants/locations.json";
import Context from "../context";

export default function Map() {
  const mapRef = useRef();

  const { dispatch } = useContext(Context);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });
    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const position = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      map.setCenter(position);
      // The marker, positioned at Uluru
      const marker = new window.google.maps.Marker({
        position,
        map,
      });

      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: position,
          radius: "5000",
          type: ["restaurant"],
        },
        (results, status) => {
          console.log(results, status);
          if (status === "OK") {
            dispatch({ type: "UPDATE_RESTAURANTS", payload: results });
          }
        }
      );
    });
  }, []);

  return <div style={{ height: "90vh" }} ref={mapRef} />;
}
