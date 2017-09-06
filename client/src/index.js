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

import appReducer from './appReducer';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

const composeEnhancers = composeWithDevTools({
  name: 'react-ml-treehouse',
  realtime: true,
  port: 8055
});

// TODO: extract to store.js?
let store = createStore(
  appReducer,
  composeEnhancers(
    applyMiddleware(thunk)
  )
);

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
