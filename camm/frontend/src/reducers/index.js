import { combineReducers } from "redux";
import auth from "./authReducer";
import asset from "./assetReducer";
import pref from "./preferencesReducer";

export default combineReducers({
  auth,
  asset,
  pref,
});
