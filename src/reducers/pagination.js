import initialState from "../initial-state";

export default function paginationReducer(state = initialState, action) {
  if (action.type === "SET_LAST_BOOKMARK") {
    return action.lastbookmark.createdAt;
  }
  return state;
}
