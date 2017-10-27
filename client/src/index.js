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
import { BrowserRouter, Route, Switch } from 'react-router-dom'


import appReducer from './appReducer';
import App from './App';
// import registerServiceWorker from './registerServiceWorker';

import MLDetailContainer from './containers/MLDetailContainer';

import { searchActions, searchSelectors } from 'ml-search-redux';


const wrappedSearchSelectors = Object.keys(searchSelectors).reduce(
  (newSelectors, name) => {
    newSelectors[name] = state => searchSelectors[name](state.search)
    return newSelectors;
  },
  {}
);

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
    {/* Decompose app more */}
    <Switch>
      <Route exact path="/" component={App}/>
      <Route path="/detail/:uri*" render={(props) => 
        ( <MLDetailContainer uri={props.match.params.uri} actions={searchActions}
            selectors={wrappedSearchSelectors} />)} />
    </Switch>
    {/* <App /> */}    
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
    <Switch>
    {/* Consider refactoring this for cleaner encapsulation */}
    <Route exact path="/" component={App}/>
    <Route path="/detail/:uri*" render={(props) => 
        ( <MLDetailContainer uri={props.match.params.uri} actions={searchActions}
            selectors={wrappedSearchSelectors} />)} />  </Switch>      {/* <App /> */}
    </BrowserRouter>
  </Provider>,
			document.getElementById('root')
		);
  })
}
// registerServiceWorker();
