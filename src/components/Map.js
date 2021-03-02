import { useEffect, useRef, useContext } from "react";
import React from "react";
import Context from "../context";

function Map() {
  const mapRef = useRef();

  const { dispatch, state } = useContext(Context);

  console.log(state.restaurants);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });

    window.google.maps.event.addListener(map, "rightclick", (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      // populate yor box/field with lat, lng
      console.log("Lat=" + lat + "; Lng=" + lng);
    });

    navigator.geolocation.getCurrentPosition(({ coords }) => {
      const position = {
        lat: coords.latitude,
        lng: coords.longitude,
      };
      map.setCenter(position);


      const service = new window.google.maps.places.PlacesService(map);
      service.nearbySearch(
        {
          location: position,
          radius: "5000",
          type: ["restaurant"],
        },
        (results, status) => {
          // console.log(results, status);
          if (status === "OK") {
            dispatch({ type: "UPDATE_RESTAURANTS", payload: results });
            for (var i = 0; i < results.length; i++) {
              createMarker(results[i]);
            }
          }
        }
      );

      function createMarker(place) {
        if (!place.geometry || !place.geometry.location) return;
        var photos = place.photos;
        if (!photos) return;
        const marker = new window.google.maps.Marker({
          map,
          position: place.geometry.location,
          title: place.name,
          icon: place.icon,
        });

        const contentString = `<div id="content"> 
        <p>${place.name}</p> 
        <img src=${photos[0].getUrl({
          maxWidth: 200,
          maxHeight: 200,
        })}/> </div>`;

        const infowindow = new window.google.maps.InfoWindow({
          content: contentString,
        });

        marker.addListener("click", () => {
          infowindow.open(map, marker);
        });
      }
    });
  }, []);

  return (
    <>
      <div className="modal-form">
        <form action="">
          <h2>Adding new restaurant</h2>
          <button className="btn btn-success">Submit</button>
        </form>
      </div>
      <div style={{ height: "calc(100vh - 57px - 56px)" }} ref={mapRef} />
    </>
  );
}

export default Map;