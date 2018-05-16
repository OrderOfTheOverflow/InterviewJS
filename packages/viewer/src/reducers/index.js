import { combineReducers } from "redux";
import { routerReducer } from "react-router-redux";

import story from "./story";
import poll from "./poll";

const rootReducer = combineReducers({
  story,
  poll,
  routing: routerReducer,
});

export default rootReducer;
