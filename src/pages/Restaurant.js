import { useEffect, useState, useRef } from "react";
import StarRatings from "react-star-ratings/build/star-ratings";
import ReviewForm from "../components/ReviewForm";

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
        if (status === "OK") {
          setRestaurant(place);
        }
        console.log(place);
      }
    );
  }, []);

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
            restaurant.photos.length > 0
              ? restaurant.photos[0].getUrl()
              : undefined
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
            <h3 className="fw-light">{restaurant.name}</h3>
            <p className="fw-lighter">{restaurant.vicinity}</p>
            <button type="button" className="btn btn-primary">
              {restaurant.opening_hours?.open_now ? "Open" : "Closed"}
            </button>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="text-center p-5">
          <h1 className="fw-normal">Reviews</h1>
          <button
            className="btn btn-primary"
            onClick={() => setReview({ time: new Date().getTime() })}
          >
            Write Review
          </button>
        </div>

        {Object.keys(review).length > 0 && <ReviewForm submit={addReview} />}

        {restaurant.reviews.map((review, index) => (
          <div key={index} class="card mb-3">
            <div class="row">
              <div class="col-md-4 d-flex align-items-center">
                <img
                  src={review.profile_photo_url}
                  className="mx-auto d-block profile mt-3 mt-md-0"
                  alt="..."
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <div className="d-flex justify-content-between">
                    <h5 class="card-title">{review.author_name}</h5>
                    <p class="card-text text-end">
                      <small class="text-muted">
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
                  <p class="card-text py-2">{review.text}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
