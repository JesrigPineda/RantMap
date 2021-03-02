import { useContext } from "react";
import Context from "../context";
import StarRatings from "react-star-ratings";
import { Link } from "react-router-dom";

export default function RestaurantList() {
  const { state } = useContext(Context);

  return (
    <div className="overflow-auto">
      <ul className="list-group">
        {state.restaurants.map((r, index) => (
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
    </div>
  );
}
