import { useEffect, useRef } from "react";
import React from "react";
import locations from "../restaurants/locations.json";

export default function Map() {
  const mapRef = useRef();

  useEffect(() => {
    new window.google.maps.Map(mapRef.current, {
      center: { lat: 16.85643325216897, lng: -99.87813259717342 },
      zoom: 8,
    });
  }, []);

  return (
    <section>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-9">
            <div style={{ height: "90vh" }} ref={mapRef} />
          </div>
          <div class="col-md-3">
            <h3>Restaurants near you</h3>
            <div id="restaurant-list"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
