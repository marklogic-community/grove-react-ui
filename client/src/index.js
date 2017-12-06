import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import './index.css';
// Put any other imports below so that CSS from your
// components takes precedence over default styles.

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'remote-redux-devtools';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom'

import appReducer from './appReducer';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = composeWithDevTools({
  name: 'react-ml-treehouse',
  realtime: true,
  port: 8055
});

// TODO: extract to store.js?
const store = createStore(
  appReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

// TODO: extract to store.js?
// Hot reloading
// https://github.com/facebookincubator/create-react-app/issues/2317
if (process.env.NODE_ENV !== "production") {
	if (module.hot) {
		module.hot.accept('./appReducer', () => {
			store.replaceReducer(appReducer)
		})
	}
}

render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

// Hot reloading
// https://github.com/facebookincubator/create-react-app/issues/2317
if (module.hot) {
  module.hot.accept('./App', () => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById('root')
    );
  })
}
// registerServiceWorker();
