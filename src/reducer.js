export default (state, { type, payload }) => {
  switch (type) {
    case 'UPDATE_RESTAURANTS':
      return {
        ...state,
        restaurants: payload,
      };
    case 'FILTER_RESTAURANTS':
      return {
        ...state,
        filtered: payload,
      };

    default:
      return state;
  }
};
