import initialState from "../initial-state";

export default function filterReducer(state = initialState, action) {
  switch (action.type) {
    case "SET_FILTER":
      return { ...state, tagFilter: action.tag };
    case "SET_SEARCH_TERM":
      return { ...state, searchTerm: action.searchTerm };
    default:
      return state;
  }
}
