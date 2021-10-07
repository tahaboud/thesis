import axios from "axios";
import {
  getEquipements,
  getSuppliers,
  getTools,
  getWorkOrders,
} from "./assetAction";
import { getLocalisations, getStocks } from "./preferencesAction";

export const loadUser = () => (dispatch, getState) => {
  dispatch({ type: "USER_LOADING" });

  axios
    .get("/api/accounts/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "USER_LOAD_SUCCESS", payload: res.data });
      dispatch(getEquipements());
      dispatch(getSuppliers());
      dispatch(getTools());
      dispatch(getWorkOrders());
      dispatch(loadUsers());
      dispatch(getStocks());
      dispatch(getLocalisations());
    })
    .catch((err) => {
      dispatch({ type: "USER_LOAD_FAIL", payload: err.response.data });
    });
};

export const login = (email, password) => (dispatch, getState) => {
  dispatch({ type: "USER_LOADING" });

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // Request Body
  const body = JSON.stringify({ email, password });

  axios
    .post("/api/accounts/login/", body, config)
    .then((res) => {
      dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
      dispatch(getEquipements());
      dispatch(getSuppliers());
      dispatch(getTools());
      dispatch(getWorkOrders());
      dispatch(loadUsers());
      dispatch(getStocks());
      dispatch(getLocalisations());
    })
    .catch((err) => {
      dispatch({ type: "LOGIN_FAIL", payload: err.response.data });
    });
};

export const register =
  (email, first_name, last_name, password) => (dispatch, getState) => {
    dispatch({ type: "USER_LOADING" });

    const body = JSON.stringify({ email, first_name, last_name, password });

    axios
      .post("/api/accounts/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data });
        dispatch(loadUsers());
      })
      .catch((err) => {
        dispatch({ type: "USER_REGISTER_FAIL", payload: err.response.data });
      });
  };

// LOGOUT USER
export const logout = () => (dispatch, getState) => {
  axios
    .post("/api/accounts/logout/", null, tokenConfig(getState))
    .then((res) => {
      dispatch({
        type: "LOGOUT_SUCCESS",
      });
    })
    .catch((err) => {
      dispatch({
        type: "LOGOUT_SUCCESS",
        payload: err.response.data,
      });
    });
};

export const loadUsers = () => (dispatch, getState) => {
  dispatch({ type: "USER_LOADING" });

  axios
    .get("/api/accounts/all/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "USERS_LOAD_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "USERS_LOAD_FAIL", payload: err.response.data });
    });
};

export const tokenConfig = (getState) => {
  // Get token from state
  const token = getState().auth.token;

  // Headers
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  // If token, add to headers config
  if (token) {
    config.headers["Authorization"] = `Token ${token}`;
  }

  return config;
};

// Funtion to free auth state
export const freeAuth = () => (dispatch) => {
  dispatch({ type: "FREE_AUTH" });
};
