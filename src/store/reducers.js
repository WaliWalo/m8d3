export default function (state = {}, action) {
  switch (action.type) {
    case "ADD_TO_FAVOURITES":
      return {
        ...state,
        favourites: state.favourites.concat(action.payload),
      };
    case "REMOVE_FROM_FAVOURITES":
      return {
        ...state,
        favourites: [...state.favourites.filter((id) => id !== action.payload)],
      };

    case "SET_USERNAME":
      return {
        ...state,
        user: {
          ...state.user,
          username: action.payload,
        },
      };

    case "SET_SELECTED_JOB":
      return {
        ...state,
        selectedJob: action.payload,
      };

    case "ADD_TO_ERRORS":
      return {
        ...state,
        errors: state.errors.concat(action.payload),
      };

    case "REMOVE_FROM_ERRORS":
      return {
        ...state,
        errors: [...state.errors.filter((id) => id !== action.payload)],
      };
    default:
      return state;
  }
}
