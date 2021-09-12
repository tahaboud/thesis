import React, { useEffect } from "react";
import ReactDOM from "react-dom";
// Import Router
import { Switch, Route, BrowserRouter } from "react-router-dom";
// Import Redux
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "../store";
import Home from "./pages/Home";
import Login from "./content/Login";
import { loadUser } from "../actions/authAction";

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated } = useSelector((state) => state.auth);
  useEffect(() => {
    dispatch(loadUser());
  }, []);
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          {isAuthenticated ? <Home /> : <Login />}
        </Route>
      </Switch>
    </BrowserRouter>
  );
};

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("app")
);
