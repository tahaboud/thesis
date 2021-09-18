const initialState = {
  isLoading: false,
  data: null,
  errors: null,
  equipements: null,
  tools: null,
  suppliers: null,
  workOrders: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "ASSET_LOADING":
      return { ...state, isLoading: true };

    case "SUPPLIER_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "SUPPLIER_GET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        suppliers: action.payload,
        errors: null,
      };

    case "EQUIPEMENT_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "EQUIPEMENT_GET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        equipements: action.payload,
        errors: null,
      };

    case "TOOL_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "TOOL_GET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        tools: action.payload,
        errors: null,
      };

    case "TREE_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "WORKORDER_ADD_SUCCESS":
      return { ...state, isLoading: false, data: action.payload, errors: null };

    case "WORKORDER_GET_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        workOrders: action.payload,
        errors: null,
      };

    case "WORKORDER_ADD_FAIL":
    case "WORKORDER_GET_FAIL":
    case "EQUIPEMENT_ADD_FAIL":
    case "EQUIPEMENT_GET_FAIL":
    case "TOOL_ADD_FAIL":
    case "TOOL_GET_FAIL":
    case "TREE_ADD_FAIL":
    case "SUPPLIER_ADD_FAIL":
    case "SUPPLIER_GET_FAIL":
      return { ...state, isLoading: false, data: null, errors: action.payload };

    default:
      return { ...state };
  }
};
