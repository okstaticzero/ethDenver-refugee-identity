//import createBrowserHistory from "history/createBrowserHistory";
import createBrowserHistory from "history/createHashHistory";
import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ConnectedRouter } from "react-router-redux";
import registerServiceWorker from "./registerServiceWorker";

import App from "./app/App";
import configureStore from "./store/configureStore";

import "./index.css";

const history = createBrowserHistory();
const store = configureStore(history);

const render = Component => {
  ReactDOM.render(
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Component />
      </ConnectedRouter>
    </Provider>,
    document.getElementById("root")
  );
};

render(App);

// In development, hot module replacement (HMR) updates the application
// when changes are made, without having to refresh.
if (module.hot) {
  module.hot.accept("./app/App", () => {
    const NextApp = require("./app/App").default;
    render(NextApp);
  });
}

registerServiceWorker();
