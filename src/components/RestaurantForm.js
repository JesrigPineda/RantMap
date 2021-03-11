import { useState } from 'react';
import StarRatings from 'react-star-ratings';

function RestaurantForm({ submit, close }) {
  const [data, setData] = useState({ rating: 0, name: '', vicinity: '' });
  const [error, setError] = useState({});

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const changeRating = (rating) => setData({ ...data, rating });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      submit({ ...data });
    }
  };

  const validate = () => {
    const errors = {};
    if (!data.name) errors.name = 'You must provide a name';
    if (!data.vicinity) errors.vicinity = 'You must provide a addres';

    return errors;
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h2>Add new restaurant</h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => close({})}
            ></button>
          </div>
          <label htmlFor="restaurantName">Name:</label>
          <input
            id="restaurantName"
            name="name"
            className={`form-control ${error.name ? 'is-invalid' : ''}`}
            type="text"
            value={data.name}
            onChange={handleChange}
          />
          {!!error.name && <div className="invalid-feedback">{error.name}</div>}
        </div>
        <div className="form-group">
          <label htmlFor="address">Address:</label>
          <input
            id="address"
            name="vicinity"
            className="form-control"
            value={data.vicinity}
            onChange={handleChange}
          />
        </div>
        <div className="py-2">
          <StarRatings
            rating={data.rating}
            starRatedColor="orange"
            changeRating={changeRating}
            numberOfStars={5}
            name="rating"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
}

export default RestaurantForm;
