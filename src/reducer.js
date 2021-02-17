export default (state, { type, payload }) => {
  switch (type) {
    case "UPDATE_RESTAURANTS":
      return {
        ...state,
        restaurants: payload,
      };

    default:
      return state;
  }
};
