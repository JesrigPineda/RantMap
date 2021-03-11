import { useEffect, useState, useRef } from 'react';
import StarRatings from 'react-star-ratings/build/star-ratings';
import ReviewForm from '../components/ReviewForm';

export default function Restaurant(props) {
  const [restaurant, setRestaurant] = useState({
    reviews: [],
    photos: [],
  });

  const [review, setReview] = useState({});

  const mapRef = useRef();
  useEffect(() => {
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 15,
    });
    const service = new window.google.maps.places.PlacesService(map);
    service.getDetails(
      {
        placeId: props.match.params.id,
      },
      (place, status) => {
        if (status === 'OK') {
          setRestaurant(place);
        }
      }
    );
  }, [props.match.params.id]);

  const addReview = (data) => {
    const newReview = { ...data, review };
    setRestaurant({
      ...restaurant,
      reviews: [newReview, ...restaurant.reviews],
    });
    setReview({});
  };

  return (
    <main className="container">
      <div ref={mapRef} />

      <div
        className="bg-image"
        style={{
          backgroundImage: `url(${
            restaurant.photos?.length > 0 ? restaurant.photos[0].getUrl() : ''
          })`,
        }}
      >
        <div className="cover">
          <div className="text-center p-4">
            <StarRatings
              rating={restaurant.rating}
              starRatedColor="orange"
              numberOfStars={5}
              name="rating"
              starDimension="25px"
              starSpacing="5px"
            />
          </div>
          <div className="p-5 text-center text-white">
            <h1 className="fw-light">{restaurant.name}</h1>
            <p className="fw-lighter">{restaurant.vicinity}</p>
            <p className="fw-lighter">{restaurant.formatted_phone_number}</p>
            <button
              type="button"
              className={
                restaurant.opening_hours?.open_now
                  ? 'btn btn-success'
                  : 'btn btn-danger'
              }
            >
              {restaurant.opening_hours?.open_now ? 'Open' : 'Closed'}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="text-center p-5">
          <h1 className="fw-normal">Gallery</h1>
          <hr className="mt-2 mb-5"></hr>
          <div className="photos">
            {restaurant.photos?.map((photo, index) => (
              <div key={index} className="align-items-center">
                <img
                  src={photo.getUrl()}
                  className="img-fluid img-thumbnail"
                  alt="..."
                />
              </div>
            ))}
          </div>
        </div>

        {!restaurant.photos && (
          <div className="alert alert-info">No photos found</div>
        )}
        <div className="text-center">
          <img
            className="img-fluid img-thumbnail"
            src={`https://maps.googleapis.com/maps/api/streetview?size=400x400&location=${restaurant.geometry?.location.lat()},${restaurant.geometry?.location.lng()}&fov=80&heading=70&pitch=0&key=AIzaSyCaNdfSoOGP6N65uKmpe7B4fV73Hk4qm-M`}
            alt=""
          />
        </div>

        <div className="text-center p-5">
          <h1 className="fw-normal">Reviews</h1>
          <hr className="mt-2 mb-5"></hr>
          <button
            className="btn btn-primary"
            onClick={() => setReview({ time: new Date().getTime() })}
          >
            Write Review
          </button>
        </div>

        {Object.keys(review).length > 0 && (
          <ReviewForm submit={addReview} close={setReview} />
        )}

        {restaurant.reviews.map((review, index) => (
          <div key={index} className="card mb-3">
            <div className="row">
              <div className="col-md-4 d-flex align-items-center">
                <img
                  src={review.profile_photo_url}
                  className="mx-auto d-block profile mt-3 mt-md-0"
                  alt="..."
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 className="card-title">{review.author_name}</h5>
                    <p className="card-text text-end">
                      <small className="text-muted">
                        {review.relative_time_description}
                      </small>
                    </p>
                  </div>
                  <StarRatings
                    rating={review.rating}
                    starRatedColor="orange"
                    numberOfStars={5}
                    name="rating"
                    starDimension="18px"
                    starSpacing="5px"
                  />
                  <p className="card-text py-2">{review.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
