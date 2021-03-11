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

    dispatch({
      type: 'FILTER_RESTAURANTS',
      payload: filtered,
    });
  };

  const clearFilters = () => {
    setFilter(0);
    dispatch({ type: 'CLEAR_FILTERS' });
  };

  const restaurants =
    state.filtered.length > 0 ? state.filtered : state.restaurants;

  return (
    <>
      <div className="bg-primary p-3">
        <p className="m-0">
          <strong className="text-white">Filter by rating</strong>
        </p>
        <StarRatings
          rating={filter}
          starRatedColor="orange"
          numberOfStars={5}
          changeRating={handleFilter}
          name="rating"
          starDimension="20px"
          starSpacing="5px"
        />
        {state.filtering && (
          <button
            onClick={clearFilters}
            className="btn btn-small bg-white ms-3 p-2"
          >
            Clear
          </button>
        )}
      </div>
      <ul className="list-group">
        {state.filtering && state.filtered.length === 0 ? (
          <li className="list-group-item">
            <div className="alert alert-warning">Nothing found</div>
          </li>
        ) : (
          restaurants.map((r, index) => (
            <li key={index} className="list-group-item">
              {r.place_id ? (
                <Link to={`/restaurant/${r.place_id}`}>
                  <strong>{r.name}</strong>
                </Link>
              ) : (
                <strong>{r.name}</strong>
              )}

              <p className="my-1">
                <small>{r.vicinity}</small>
              </p>
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
          ))
        )}
      </ul>
    </>
  );
}
