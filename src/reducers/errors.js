/* eslint-disable import/no-anonymous-default-export */
export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_TO_ERRORS":
      return state.errors.concat(action.payload);

    case "REMOVE_FROM_ERRORS":
      return [...state.errors.filter((id) => id !== action.payload)];
    default:
      return state;
  }
}
