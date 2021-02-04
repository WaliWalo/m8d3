/* eslint-disable import/no-anonymous-default-export */
export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_TO_RESULTS":
      return action.payload;

    case "REMOVE_FROM_RESULTS":
      return [...state.filter((id) => id !== action.payload)];
    default:
      return state;
  }
}
