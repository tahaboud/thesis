import axios from "axios";
import { tokenConfig } from "./authAction";

export const addLocalisation =
  ({ name }) =>
  (dispatch, getState) => {
    dispatch({ type: "PREF_LOADING" });

    const body = JSON.stringify({ name });

    axios
      .post("/api/preferences/localisation/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "LOCALISATION_ADD_SUCCESS", payload: res.data });
        dispatch(getLocalisations());
      })
      .catch((err) => {
        dispatch({
          type: "LOCALISATION_ADD_FAIL",
          payload: err.response.data,
        });
      });
  };

export const getLocalisations = () => (dispatch, getState) => {
  dispatch({ type: "PREF_LOADING" });

  axios
    .get("/api/preferences/localisation/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "LOCALISATION_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({
        type: "LOACALISATION_GET_FAIL",
        payload: err.response.data,
      });
    });
};

export const addStock =
  ({ name }) =>
  (dispatch, getState) => {
    dispatch({ type: "PREF_LOADING" });

    const body = JSON.stringify({ name });

    axios
      .post("/api/preferences/stock/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "STOCK_ADD_SUCCESS", payload: res.data });
        dispatch(getStocks());
      })
      .catch((err) => {
        dispatch({ type: "STOCK_ADD_FAIL", payload: err.response.data });
      });
  };

export const getStocks = () => (dispatch, getState) => {
  dispatch({ type: "PREF_LOADING" });

  axios
    .get("/api/preferences/stock/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "STOCK_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "STOCK_GET_FAIL", payload: err.response.data });
    });
};
