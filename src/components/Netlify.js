import React, { Component } from "react";
import axios from "axios";

class Netlify extends Component {
  componentDidMount() {}

  // https://better-bookmarks-thomas.netlify.com/

  getData = () => {
    let url;
    if (process.env.NODE_ENV === "production") {
      console.log(process.env.NODE_ENV);
      url = "/.netlify/functions/hello";
    } else {
      console.log(process.env.NODE_ENV);
      url = "http://localhost:9000/hello";
    }
    axios
      .get(url)
      .then(function(response) {
        console.log(response);
      })
      .catch(function(error) {
        console.log(error);
      })
      .then(function() {});
  };
  render() {
    return (
      <p>
        <button onClick={this.getData}>get data</button>
      </p>
    );
  }
}

export default Netlify;
