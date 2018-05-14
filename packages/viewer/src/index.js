import React from "react";
import { Provider } from "react-redux";
import { render } from "react-dom";
import { Route, Router, IndexRoute, Redirect } from "react-router";
import ReactGA from "react-ga";

import { configureStore, history } from "./configureStore";

import App from "./App";
import Chat from "./views/Chat";
import Context from "./views/Context";
import Interviewees from "./views/Interviewees";
import Intro from "./views/Intro";
import Listing from "./views/Listing";
import Outro from "./views/Outro";
import Poll from "./views/Poll";
import Results from "./views/Results";

const store = configureStore();

require("./injectGlobalStyles.js");

ReactGA.initialize("UA-1615344-7");
const pageView = () => ReactGA.pageview(document.location.pathname);

const onUpdate = () => {
  pageView();
  window.scrollTo(0, 0);
};

const rootEl = document.getElementById("root");

class Routes extends React.Component {
  /*
    set `shouldComponentUpdate` to false to make hot loading work as discussed here:
    https://github.com/reactjs/react-router-redux/issues/179#issuecomment-281437927
  */
  shouldComponentUpdate() {
    return false;
  }

  render() {
    return (
      <Router onUpdate={onUpdate} key="Root" history={history}>
        <Route path="/:storyId" component={App}>
          <IndexRoute component={Intro} />
          <Route path="/:storyId/chat/:chatId" component={Chat} />
          <Route path="/:storyId/context" component={Context} />
          <Route path="/:storyId/interviewees" component={Interviewees} />
          <Route path="/:storyId/listing" component={Listing} />
          <Route path="/:storyId/outro" component={Outro} />
          <Route path="/:storyId/poll" component={Poll} />
          <Route path="/:storyId/results" component={Results} />
          <Route path="/:storyId/:clearStorage" component={Intro} />
        </Route>
        <Redirect from="/" to="sample-story" />
      </Router>
    );
  }
}

const router = (
  <Provider store={store}>
    <Routes />
  </Provider>
);

render(router, rootEl);

if (module.hot) {
  module.hot.accept(App, () => {
    render(router, rootEl);
  });
}
