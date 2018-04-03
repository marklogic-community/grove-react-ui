import React from 'react';
import { withRouter, Switch, Route, Redirect } from 'react-router-dom';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import MLSearchContainer from './MLSearchContainer';
import MLDetailContainer from './MLDetailContainer';
import Login from './LoginContainer';

import {
  actions as searchActions,
  selectors as searchSelectors
} from 'ml-search-redux';
import {
  actions as documentActions,
  selectors as documentSelectors
} from 'ml-documents-redux';
import {
  // actions as userActions,
  selectors as userSelectors
} from '../muir-user-redux';

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
const boundUserSelectors = bindSelectors(userSelectors, 'user');

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

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: boundUserSelectors.isCurrentUserAuthenticated(state),
    ...ownProps
  };
};

const RoutesContainer = withRouter(connect(mapStateToProps)(Routes));

export default RoutesContainer;
