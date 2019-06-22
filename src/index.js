import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import "spectre.css/dist/spectre.min.css";
import "spectre.css/dist/spectre-icons.css";
import Application from "./components/Application";
import { startListeningToAuthChanges } from "./actions/auth";
import * as serviceWorker from "./serviceWorker";
import { store } from "./store";

store.dispatch(startListeningToAuthChanges());

ReactDOM.render(
  <Provider store={store}>
    <Application />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.register();
