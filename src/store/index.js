import appReducer from "./reducers";
import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
const initialState = {
  results: [],
  form: {
    full_time: false,
    position: "",
    location: "",
  },
};

const consoleMessages = (store) => (next) => (action) => {
  let result;

  console.groupCollapsed(`dispatching action => ${action.type}`);
  console.log("search results", store.getState().searchResult.length);
  result = next(action);

  let { searchResult, errors } = store.getState();

  console.log(`

		searchResults: ${searchResult}
		errors: ${errors.length}

	`);

  console.groupEnd();

  return result;
};

export default (initialState = {}) => {
  return applyMiddleware(thunk, consoleMessages)(createStore)(
    appReducer,
    initialState
  );
};
