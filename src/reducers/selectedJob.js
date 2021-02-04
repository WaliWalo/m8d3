/* eslint-disable import/no-anonymous-default-export */
export default function (state = {}, action) {
  switch (action.type) {
    case "SET_SELECTED_JOB":
      return action.payload;

    default:
      return state;
  }
}
