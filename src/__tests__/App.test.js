import React from "react";
import ReactDOM from "react-dom";
import Application from "../components/Application";
import { Provider } from "react-redux";
import { store } from "../store";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <Provider store={store}>
      <Application />
    </Provider>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});

// it('renders without crashing' )
