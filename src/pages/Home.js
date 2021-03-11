import React from 'react';
import Map from '../components/Map';
import RestaurantList from '../components/RestaurantList';

function Home() {
  return (
    <div className="container-fluid p-0">
      <div className="row g-0">
        <div className="col-md-9">
          <Map />
        </div>
        <div className="col-md-3">
          <div
            style={{ height: 'calc(100vh - 57px - 56px)', overflow: 'auto' }}
          >
            <h3 className="mx-3">Restaurants near you</h3>
            <RestaurantList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
