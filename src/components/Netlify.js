//@flow

import React, { Component } from "react";
import axios from "axios";

class Netlify extends Component {
  state = {
    data: {},
    value: ""
  };

  handleChange = event => {
    this.setState({ value: event.target.value });
  };

  handleSubmit = async event => {
    const lambdaEndpoint =
      process.env.NODE_ENV === "development"
        ? "http://localhost:9000/hello"
        : "/.netlify/functions/hello";

    event.preventDefault();

    const obj = {
      url: this.state.value
    };

    const response = await axios.post(lambdaEndpoint, JSON.stringify(obj));
    console.log(response);
    this.setState({ value: "", data: response.data });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="value">value</label>
          <input
            type="text"
            name="value"
            onChange={this.handleChange}
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
