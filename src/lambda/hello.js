const axios = require("axios");
// const jsdom = require("jsdom");

// const { JSDOM } = jsdom;

const URL = "https://jsonplaceholder.typicode.com/posts/1";

exports.handler = async (event, context) => {
  const response = await axios.get(URL);
  // const dom = new JSDOM(response.data);
  // // // console.log(response);
  // const title = dom.window.document.querySelector("title").textContent;
  // console.log(title);
  // const data = JSON.parse(event.body);

  return {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200,
    body: JSON.stringify({ data: response.data })
  };
};
