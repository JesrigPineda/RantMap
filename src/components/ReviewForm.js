import { useState } from 'react';
import StarRatings from 'react-star-ratings';

function ReviewForm({ submit, close }) {
  const [data, setData] = useState({ rating: 0, author_name: '', text: '' });
  const [error, setError] = useState({});

  const profile_photo_url =
    'https://icongr.am/fontawesome/user-circle-o.svg?size=148&color=c2c2c2';

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const changeRating = (rating) => setData({ ...data, rating });

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validate();

    if (Object.keys(errors).length > 0) {
      setError(errors);
    } else {
      submit({ ...data, profile_photo_url });
    }
  };

  const validate = () => {
    const errors = {};
    if (!data.author_name) errors.author_name = 'You must provide a name';
    if (!data.text) errors.text = 'You must provide a comment';

    return errors;
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <div className="d-flex justify-content-between">
            <h2>Add new comment</h2>
            <button
              type="button"
              className="btn-close"
              aria-label="Close"
              onClick={() => close({})}
            ></button>
          </div>
          <label htmlFor="authorName">Name:</label>
          <input
            id="authorName"
            name="author_name"
            className={`form-control ${error.author_name ? 'is-invalid' : ''}`}
            type="text"
            value={data.author_name}
            onChange={handleChange}
          />
          {!!error.author_name && (
            <div className="invalid-feedback">{error.author_name}</div>
          )}
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments:</label>
          <textarea
            id="comments"
            name="text"
            className="form-control"
            value={data.text}
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

export default ReviewForm;
