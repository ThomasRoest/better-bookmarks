import initialState from "../initial-state";

export default function menuStateReducer(state = initialState, action) {
  if (action.type === "TOGGLE_DRAWER_MENU") {
    return !state;
  }
  return state;
}
