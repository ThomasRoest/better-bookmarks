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

  const data = JSON.parse(event.body);
  console.log(data);

  // init index with userId
  // var index = client.initIndex(`bookmarks-${data.userId}`);

  // index.deleteObjects(objectIds, callback);

  // async await????? --> where is the await

  // await index.deleteBy(
  //   {
  //     id: "Z1Gcrzx1iBLQ8o80jIFE"
  //   },
  //   function(err, content) {
  //     if (err) throw err;

  //     console.log(content);
  //   }
  // );

  // await index.deleteObject("707374312", function(err, content) {
  //   if (err) throw err;

  //   console.log(content);
  // });

  return {
    headers: {
      "content-type": "application/json",
      "Access-Control-Allow-Origin": "*"
    },
    statusCode: 200,
    body: `delete item from index`
  };
};
