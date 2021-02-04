import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import errorsReducer from "../reducers/errors";
import favouritesReducer from "../reducers/favourites";
import selectedJobReducer from "../reducers/selectedJob";
import userReducer from "../reducers/user";
import resultsReducer from "../reducers/results";
import thunk from "redux-thunk";

const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  favourites: [],
  errors: [],
  user: {
    username: null,
  },
  selectedJob: null,
  results: [],
};

const allReducers = combineReducers({
  favourites: favouritesReducer,
  errors: errorsReducer,
  user: userReducer,
  selectedJob: selectedJobReducer,
  results: resultsReducer,
});

export default function configureStore() {
  return createStore(
    allReducers,
    initialState,
    composedEnhancer(applyMiddleware(thunk))
  );
}
