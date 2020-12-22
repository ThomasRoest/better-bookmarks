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
    const result = await index.search({ query: bookmark.id });
    const objectID = result.hits[0].objectID;
    await index.deleteObject(objectID);

    return {
      headers: {
        "content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      statusCode: 200,
      body: `Deleted item from index`,
    };
  } catch (error) {
    return { statusCode: 500, body: error.toString() };
  }
};
