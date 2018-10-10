import initialState from "../initial-state";

export default function loadingStateReducer(state = initialState, action) {
  switch (action.type) {
    case "LOADING_START":
      return true;
    case "LOADING_FINISHED":
      return false;
    default:
      return state;
  }
}
