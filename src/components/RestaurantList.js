import { useContext } from "react";
import Context from "../context";

export default function RestaurantList() {
  const { state } = useContext(Context);

  console.log({ state });
  return (
    <ul className="list-group">
      {state.restaurants.map((r) => (
        <li className="list-group-item">{r.name}</li>
      ))}
    </ul>
  );
}
