import { combineReducers } from "redux";
import authReducer from "./auth";
import bookmarksReducer from "./bookmarks";
import tagsReducer from "./tags";
import filterReducer from "./filters";
import loadingStateReducer from "./loading";

const reducer = combineReducers({
  tags: tagsReducer,
  auth: authReducer,
  filters: filterReducer,
  isLoading: loadingStateReducer,
  bookmarks: bookmarksReducer
});

export default reducer;
