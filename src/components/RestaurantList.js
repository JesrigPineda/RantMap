import { useContext, useState } from 'react';
import Context from '../context';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

export default function RestaurantList() {
  const { state, dispatch } = useContext(Context);

  const [filter, setFilter] = useState(0);
  const handleFilter = (rating) => {
    setFilter(rating);
    const filtered = state.restaurants.filter(
      (r) => Math.floor(r.rating) === rating
    );

    console.log({ filtered });
    dispatch({
      type: 'FILTER_RESTAURANTS',
      payload: filtered,
    });
  };

  const restaurants =
    state.filtered.length > 0 ? state.filtered : state.restaurants;

  return (
    <>
      <div>
        <StarRatings
          rating={filter}
          starRatedColor="orange"
          numberOfStars={5}
          changeRating={handleFilter}
          name="rating"
          starDimension="20px"
          starSpacing="5px"
        />
      </div>
      <ul className="list-group">
        {restaurants.map((r, index) => (
          <li key={index} className="list-group-item">
            <Link to={`/restaurant/${r.place_id}`}>
              <strong>{r.name}</strong>
            </Link>
            <div>
              <StarRatings
                rating={r.rating}
                starRatedColor="orange"
                numberOfStars={5}
                name="rating"
                starDimension="20px"
                starSpacing="5px"
              />
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
