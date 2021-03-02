import { useState } from "react";
import StarRatings from "react-star-ratings";

function ReviewForm({ submit }) {
  const [data, setData] = useState({ rating: 0, author_name: "", text: "" });

  const handleChange = (e) =>
    setData({ ...data, [e.target.name]: e.target.value });

  const changeRating = (rating) => setData({ ...data, rating });

  const handleSubmit = (e) => {
    e.preventDefault();

    submit(data);
  };

  return (
    <div className="modal-form">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="authorName">Name</label>
          <input
            id="authorName"
            name="author_name"
            className="form-control"
            type="text"
            value={data.author_name}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="comments">Comments</label>
          <textarea
            id="comments"
            name="text"
            className="form-control"
            value={data.text}
            onChange={handleChange}
          />
        </div>
        <div>
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
