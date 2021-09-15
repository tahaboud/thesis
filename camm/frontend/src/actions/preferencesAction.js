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
      })
      .catch((err) => {
        dispatch({
          type: "LOACALISATION_ADD_FAIL",
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
      })
      .catch((err) => {
        dispatch({ type: "STOCK_ADD_FAIL", payload: err.response.data });
      });
  };
