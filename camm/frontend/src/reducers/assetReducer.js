const initialState = {
  isLoading: false,
  data: null,
  errors: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ASSET_LOADING":
      return { ...state, isLoading: true };

    case "SUPPLIER_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "EQUIPEMENT_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "TOOL_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "TREE_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "WORKORDER_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "SUPPLIER_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    case "EQUIPEMENT_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    case "TOOL_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    case "TREE_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    case "WORKORDER_ADD_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    default:
      return { ...state };
  }
};
