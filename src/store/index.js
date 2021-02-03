import appReducer from "./reducers";
import { createStore } from "redux";
const initialState = {
  favourites: [],
  errors: [],
  user: {
    username: null,
  },
  selectedJob: null,
};

export default function configureStore() {
  return createStore(
    appReducer,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
}
