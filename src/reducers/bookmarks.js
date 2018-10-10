import initialState from "../initial-state.js";

const addBookmark = (state, action) => {
  const { id, url, userId, title, createdAt, tags } = action.payload;
  return [
    ...state,
    {
      id,
      url,
      userId,
      title,
      createdAt,
      tags
    }
  ];
};

const removeBookmark = (state, action) => {
  return [...state].filter(item => item.id !== action.payload.id);
};

const setBookmarks = (state, action) => {
  return action.payload;
};

const setBookmark = (state, action) => {
  // refactor?
  const index = state.findIndex(item => item.id === action.payload.id);
  if (index > -1) {
    return state.map(item => {
      if (item.id === action.payload.id) return action.payload;
      return item;
    });
  } else {
    return [...state, action.payload];
  }
};

// set to initialState
export default (state = initialState, action) => {
  switch (action.type) {
    case "SET_BOOKMARKS":
      return setBookmarks(state, action);
    case "ADD_BOOKMARK":
      return addBookmark(state, action);
    case "REMOVE_BOOKMARK":
      return removeBookmark(state, action);
    case "BOOKMARK_FETCHED":
      return setBookmark(state, action);
    default:
      return state;
  }
};
