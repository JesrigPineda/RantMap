import React from "react";
import Map from "../components/Map";
import RestaurantList from "../components/RestaurantList";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-9">
          <Map />
        </div>
        <div className="col-md-3">
          <h3>Restaurants near you</h3>
          <RestaurantList />
        </div>
      </div>
    </div>
  );
}
