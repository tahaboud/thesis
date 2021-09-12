const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  isAdmin: false,
  user: null,
  data: null,
  errors: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FREE_AUTH_ERRORS":
      return { ...state, errros: null };

    case "USER_LOADING":
      return { ...state, isLoading: true, errors: null, data: null };

    case "USER_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        user: action.payload,
        data: action.payload,
        isAuthenticated: true,
        errors: null,
      };
    case "LOGIN_SUCCESS":
      localStorage.setItem("token", action.payload.token);
      return {
        ...state,
        isLoading: false,
        isAuthenticated: true,
        user: action.payload,
        data: action.payload,
        errors: null,
        token: action.payload.token,
      };
    case "LOGIN_FAIL":
    case "USER_LOAD_FAIL":
    case "LOGOUT_SUCCESS":
      localStorage.removeItem("token");
      return {
        ...state,
        isLoading: false,
        isAuthenticated: false,
        user: null,
        data: null,
        errors: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

export default authReducer;
