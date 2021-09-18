import axios from "axios";
import { tokenConfig } from "./authAction";

export const addSupplier =
  ({ full_name, address, phone_number, email, comment }) =>
  (dispatch, getState) => {
    dispatch({ type: "ASSET_LOADING" });

    const body = JSON.stringify({
      full_name,
      address,
      phone_number,
      email,
      comment,
    });

    axios
      .post("/api/assets/supplier/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "SUPPLIER_ADD_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "SUPPLIER_ADD_FAIL", payload: err.response.data });
      });
  };

export const getSuppliers = () => (dispatch, getState) => {
  dispatch({ type: "ASSET_LOADING" });

  axios
    .get("/api/assets/supplier/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "SUPPLIER_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "SUPPLIER_GET_FAIL", payload: err.response.data });
    });
};

export const addEquipement =
  ({ code, localisation, supplier, brand, serial_number, comment }) =>
  (dispatch, getState) => {
    dispatch({ type: "ASSET_LOADING" });

    const body = JSON.stringify({
      code,
      localisation,
      supplier,
      brand,
      serial_number,
      comment,
    });

    axios
      .post("/api/assets/equipement/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "EQUIPEMENT_ADD_SUCCESS", payload: res.data });
        dispatch(getEquipements());
      })
      .catch((err) => {
        dispatch({ type: "EQUIPEMENT_ADD_FAIL", payload: err.response.data });
      });
  };

export const getEquipements = () => (dispatch, getState) => {
  dispatch({ type: "ASSET_LOADING" });

  axios
    .get("/api/assets/equipement/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "EQUIPEMENT_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "EQUIPEMENT_GET_FAIL", payload: err.response.data });
    });
};

export const addTool =
  ({ full_name, number, price, shelf, supplier, comment }) =>
  (dispatch, getState) => {
    dispatch({ type: "ASSET_LOADING" });

    const body = JSON.stringify({
      full_name,
      number,
      price,
      shelf,
      supplier,
      comment,
    });

    axios
      .post("/api/assets/tools/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "TOOL_ADD_SUCCESS", payload: res.data });
        dispatch(getTools());
      })
      .catch((err) => {
        dispatch({ type: "TOOL_ADD_FAIL", payload: err.response.data });
      });
  };

export const getTools = () => (dispatch, getState) => {
  dispatch({ type: "ASSET_LOADING" });

  axios
    .get("/api/assets/tools/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "TOOL_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "TOOL_GET_FAIL", payload: err.response.data });
    });
};

export const addTreeStructure =
  ({ name, equipement }) =>
  (dispatch, getState) => {
    dispatch({ type: "ASSET_LOADING" });

    const body = JSON.stringify({ name, equipement });

    axios
      .post("/api/assets/tree/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "TREE_ADD_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "TREE_ADD_FAIL", payload: err.response.data });
      });
  };

export const addWorkOrder =
  ({
    equipement,
    failed_piece,
    repair_piece,
    is_down,
    maintenance_start_time,
    maintenance_end_time,
  }) =>
  (dispatch, getState) => {
    dispatch({ type: "ASSET_LOADING" });

    const body = JSON.stringify({
      equipement,
      failed_piece,
      repair_piece,
      is_down,
      maintenance_start_time,
      maintenance_end_time,
    });

    axios
      .post("/api/assets/workorder/", body, tokenConfig(getState))
      .then((res) => {
        dispatch({ type: "WORKORDER_ADD_SUCCESS", payload: res.data });
      })
      .catch((err) => {
        dispatch({ type: "WORKORDER_ADD_FAIL", payload: err.response.data });
      });
  };

export const getWorkOrders = () => (dispatch, getState) => {
  dispatch({ type: "ASSET_LOADING" });

  axios
    .get("/api/assets/workorder/", tokenConfig(getState))
    .then((res) => {
      dispatch({ type: "WORKORDER_GET_SUCCESS", payload: res.data });
    })
    .catch((err) => {
      dispatch({ type: "WORKORDER_GET_FAIL", payload: err.response.data });
    });
};
