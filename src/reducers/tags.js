import initialState from "../initial-state";

const setTags = (state, action) => {
  return action.tags;
};

const removeTag = (state, action) => {
  return [...state].filter(item => item.id !== action.id);
};

export default function tagsReducer(state = initialState.tags, action) {
  switch (action.type) {
    case "ADD_TAG":
      return [...state, action.tag];
    case "SET_TAGS":
      return setTags(state, action);
    case "REMOVE_TAG":
      return removeTag(state, action);
    default:
      return state;
  }
}
