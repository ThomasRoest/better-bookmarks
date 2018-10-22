//@flow

import React, { Component } from "react";
import axios from "axios";

class Netlify extends Component {
  state = {
    data: {},
    value: "",
    isLoading: false
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleBlur = async event => {
    this.setState({ isLoading: true });
    // console.log("well then");
    const lambdaEndpoint =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9000/hello"
        : "/.netlify/functions/hello";

    // event.preventDefault();

    const obj = {
      url: this.state.value
    };

    const response = await axios.post(lambdaEndpoint, JSON.stringify(obj));
    console.log(response.data);
    console.log(lambdaEndpoint);
    this.setState({ data: response.data.pageTitle, isLoading: false });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          {this.state.isLoading && (
            <div>
              getting title....
              <div className="loading loading-lg" />
            </div>
          )}
          <label htmlFor="value">value</label>
          <input
            type="text"
            name="value"
            className="form-input"
            onChange={this.handleChange}
            onBlur={this.handleBlur}
            value={this.state.value}
          />
          <input type="submit" value="save" />
        </form>
        <pre>
          <code>{JSON.stringify(this.state.data)}</code>
        </pre>
      </div>
    );
  }
}

export default Netlify;
