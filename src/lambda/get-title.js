const axios = require("axios");
const cheerio = require("cheerio");

exports.handler = async (event, context) => {
  const data = JSON.parse(event.body);
  const response = await axios.get(data.url);
  const $ = cheerio.load(response.data);
  const pageTitle = $("title").text();

  return {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200,
    body: JSON.stringify({ pageTitle })
  };
};
