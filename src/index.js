import React from "react";
import ReactDOM from "react-dom";
import { applyMiddleware, compose, createStore } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import reducer from "./reducers";
import initialState from "./initial-state";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import Application from "./components/Application";

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
