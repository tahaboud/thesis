const initialState = {
  token: localStorage.getItem("token"),
  isAuthenticated: false,
  isLoading: false,
  isAdmin: false,
  user: null,
  users: null,
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
    case "USERS_LOAD_SUCCESS":
      return {
        ...state,
        isLoading: false,
        users: action.payload,
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
    case "USER_REGISTER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        data: action.payload,
        errors: null,
      };
    case "USER_REGISTER_FAIL":
      return {
        ...state,
        isLoading: false,
        data: null,
        errors: action.payload,
      };
    case "USERS_LOAD_FAIL":
      return {
        ...state,
        isLoading: false,
        errors: action.payload,
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
