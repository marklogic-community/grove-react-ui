import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MLSearchContainer from '../containers/MLSearchContainer';
import MLDetailContainer from '../containers/MLDetailContainer';
import Login from '../containers/LoginContainer';

import {
  actions as searchActions,
  selectors as searchSelectors
} from 'ml-search-redux';
import {
  actions as documentActions,
  selectors as documentSelectors
} from 'ml-documents-redux';
import { bindSelectors } from '../utils/redux-utils';

const boundSearchSelectors = bindSelectors(searchSelectors, 'search');
const boundDocumentSelectors = bindSelectors(documentSelectors, 'documents');

const LoggedInRoutes = () => (
  <Switch>
    <Route
      exact
      path="/"
      render={() => (
        <MLSearchContainer
          actions={searchActions}
          selectors={boundSearchSelectors}
        />
      )}
    />
    <Route
      exact
      path="/detail/:uri*"
      render={props => (
        <MLDetailContainer
          uri={decodeURIComponent(props.match.params.uri)}
          actions={documentActions}
          selectors={boundDocumentSelectors}
        />
      )}
    />
    <Redirect from="/login" to="/" />
  </Switch>
);

const LoggedOutRoutes = (props) => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <Redirect exact to="/login" state={{from: props.location}}/>
  </Switch>
);

const Routes = ({ isAuthenticated }, ...props) => {
  return isAuthenticated ? <LoggedInRoutes {...props}/> : <LoggedOutRoutes {...props} />;
}

export default Routes;
