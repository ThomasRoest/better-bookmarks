import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
// import logger from "redux-logger";

import reducer from "./reducers";
import initialState from "./initial-state";
import Application from "./components/Application";
import "./css/spectre.min.css";
import "./css/custom.css";

import { startListeningToAuthChanges } from "./actions/auth";

const middleware = [thunk];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducer,
  initialState,
  composeEnhancers(applyMiddleware(...middleware), ...enhancers)
);

store.dispatch(startListeningToAuthChanges());

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);
