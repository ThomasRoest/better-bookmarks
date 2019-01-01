var algoliasearch = require("algoliasearch");
const dotenv = require("dotenv");

dotenv.load();

var client = algoliasearch(
  process.env.REACT_APP_ALGOLIA_APP_ID,
  process.env.ALGOLIA_API_KEY
);

exports.handler = async (event, context) => {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const bookmark = JSON.parse(event.body);

  // init index with userId
  var index = client.initIndex(`bookmarks-${bookmark.userId}`);

  // add item to index
  index.addObjects([bookmark], (err, content) => {
    if (err) {
      console.error(err);
    }
  });

  return {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200,
    body: `Added new bookmark to index`
  };
};
