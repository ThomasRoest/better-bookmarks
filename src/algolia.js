import algoliasearch from "algoliasearch/lite";

const appId = process.env.REACT_APP_ALGOLIA_APP_ID;
const searchKey = process.env.REACT_APP_ALGOLIA_SEARCH_KEY;

export const algoliaSearchClient = algoliasearch(appId, searchKey);
