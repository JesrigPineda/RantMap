const reducer = (state, { type, payload }) => {
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
        filtering: true,
      };
    case 'CLEAR_FILTERS':
      return {
        ...state,
        filtered: [],
        filtering: false,
      };

    default:
      return state;
  }
};

export default reducer;
