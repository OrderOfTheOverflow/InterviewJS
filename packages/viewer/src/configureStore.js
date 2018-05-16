import { createStore, compose, applyMiddleware } from "redux";
import { syncHistoryWithStore } from "react-router-redux";
import { browserHistory } from "react-router";

import Raven from "raven-js";
import createRavenMiddleware from "raven-for-redux";

import rootReducer from "./reducers";

// Sentry.io
Raven.config("https://5ead2dcac648436b93094e8a371bf1b1@sentry.io/365850", {
  release: process.env.VERSION,
  autoBreadcrumbs: {
    xhr: false,
    console: false,
    dom: false,
  },
  maxBreadcrumbs: 32,
  sanitizeKeys: ["logo", "cover", "avatar"],
}).install();

const defaultState = {
  story: window.InterviewJS && window.InterviewJS.story ? window.InterviewJS.story : {},
  poll: window.InterviewJS && window.InterviewJS.poll ? window.InterviewJS.poll : [],
};

const enhancers = compose(
  applyMiddleware(
    createRavenMiddleware(Raven, {
      stateTransformer: state => state.id,
    })
  ),
  window.devToolsExtension ? window.devToolsExtension() : f => f
);

const store = createStore(rootReducer, defaultState, enhancers);

export const history = syncHistoryWithStore(browserHistory, store);
export const configureStore = () => {
  if (process.env.NODE_ENV !== "production") {
    if (module.hot) {
      module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer, defaultState, enhancers);
      });
    }
  }
  return store;
};
