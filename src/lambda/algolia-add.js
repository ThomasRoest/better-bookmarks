var algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.config();

var client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  try {
    const bookmark = JSON.parse(event.body);
    var index = client.initIndex(`bookmarks-${bookmark.userId}`);
    await index.addObjects([bookmark]);
    return {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: `Added new bookmark to index`,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
