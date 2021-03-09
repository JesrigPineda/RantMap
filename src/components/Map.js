import { useEffect, useRef, useContext, useState } from 'react';
import React from 'react';
import Context from '../context';
import googleMapIcon from 'google-maps-icons';
import RestaurantForm from './RestaurantForm';

function Map() {
  const mapRef = useRef();

  const { dispatch, state } = useContext(Context);
  const [restaurant, setRestaurant] = useState({});
  const [mapElm, setMapElm] = useState(null);

  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });

    setMapElm(map);

    window.google.maps.event.addListener(map, 'rightclick', (event) => {
      const lat = event.latLng.lat();
      const lng = event.latLng.lng();
      // populate yor box/field with lat, lng
      setRestaurant({
        geometry: {
          location: {
            lat,
            lng,
          },
        },
      });
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
          radius: '5000',
          type: ['restaurant'],
        },
        (results, status) => {
          // console.log(results, status);
          if (status === 'OK') {
            dispatch({ type: 'UPDATE_RESTAURANTS', payload: results });
          }
        }
      );
    });
  }, []);

  useEffect(() => {
    const restaurants =
      state.filtered.length > 0 ? state.filtered : state.restaurants;

    restaurants.map((r) => createMarker(r));
  }, [state.restaurants]);

  const createMarker = (place) => {
    if (place.geometry) {
      // icon options for Marker
      const options = { scale: 1.5, color: 'ff9e67' };
      const iconUrl = googleMapIcon('restaurant', options);

      const position = {
        lat: place.place_id
          ? place.geometry.location.lat()
          : place.geometry.location.lat,
        lng: place.place_id
          ? place.geometry.location.lng()
          : place.geometry.location.lng,
      };

      const marker = new window.google.maps.Marker({
        map: mapElm,
        position,
        animation: window.google.maps.Animation.DROP,
        title: place.name,
        icon: iconUrl,
      });

      const contentString = `<div id="content"> 
    <p>${place.name}</p> 
    ${
      place.photos &&
      `<img src=${place.photos[0].getUrl({
        maxWidth: 200,
        maxHeight: 200,
      })}/>`
    }
     </div>`;

      const infowindow = new window.google.maps.InfoWindow({
        content: contentString,
      });

      marker.addListener('click', () => {
        infowindow.open(mapElm, marker);
      });
    }
  };

  const addRestaurant = (data) => {
    const newRestaurant = { ...data, ...restaurant };

    dispatch({
      type: 'UPDATE_RESTAURANTS',
      payload: [newRestaurant, ...state.restaurants],
    });

    setRestaurant({});
  };

  return (
    <>
      {restaurant.geometry && (
        <RestaurantForm submit={addRestaurant} close={setRestaurant} />
      )}
      <div style={{ height: 'calc(100vh - 57px - 56px)' }} ref={mapRef} />
    </>
  );
}

export default Map;
