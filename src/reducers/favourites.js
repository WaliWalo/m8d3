/* eslint-disable import/no-anonymous-default-export */
export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      console.log(state);
      return [...state, action.payload];
    case "REMOVE_FROM_FAVOURITES":
      return [...state.filter((id) => id !== action.payload)];
    default:
      return state;
  }
}
