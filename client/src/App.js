import React from 'react';
import { Grid } from 'react-bootstrap';
import { Switch, Route, Redirect } from 'react-router-dom';

import MLSearchContainer from './containers/MLSearchContainer';
import MLDetailContainer from './containers/MLDetailContainer';
import Navbar from './components/Navbar';
import Login from './components/Login';

import {
  actions as searchActions,
  selectors as searchSelectors
} from 'ml-search-redux';
import {
  actions as documentActions,
  selectors as documentSelectors
} from 'ml-documents-redux';

// TODO: extract into a utility: also used within redux modules
const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args);
  };
};
const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint);
    return bound;
  }, {});
};

const boundSearchSelectors = bindSelectors(searchSelectors, 'search');
const boundDocumentSelectors = bindSelectors(documentSelectors, 'documents');

const currentUserSelectors = {
  isAuthenticated: true
};
const ProtectedRoute = ({ render, ...props }) => (
  <Route
    {...props}
    render={
      currentUserSelectors.isAuthenticated
        ? render
        : () => (
            <Redirect
              to={{ pathname: '/login', state: { from: props.location } }}
            />
          )
    }
  />
);

class App extends React.Component {
  render() {
    return (
      <div>
        <Navbar />
        <Grid fluid={true}>
          <Switch>
            <ProtectedRoute
              exact
              path="/"
              render={() => (
                <MLSearchContainer
                  actions={searchActions}
                  selectors={boundSearchSelectors}
                />
              )}
            />
            <Route exact path="/login" component={Login} />
            <ProtectedRoute
              path="/detail/:uri*"
              render={props => (
                <MLDetailContainer
                  uri={decodeURIComponent(props.match.params.uri)}
                  actions={documentActions}
                  selectors={boundDocumentSelectors}
                />
              )}
            />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default App;
