const initialState = {
  isLoading: false,
  data: null,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "PREF_LOADING":
      return { ...state, isLoading: true };

    case "LOCALISATION_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "STOCK_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "LOCALISATION_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    case "STOCK_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    default:
      return { ...state };
  }
};
