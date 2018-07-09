import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  SearchContainer,
  DetailContainer,
  LoginContainer
} from 'muir-core-react-redux-containers';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" render={() => <SearchContainer />} />
    <Route
      exact
      path="/detail/:uri*"
      render={props => (
        <DetailContainer uri={decodeURIComponent(props.match.params.uri)} />
      )}
    />
    <Redirect from="/login" to="/" />
  </Switch>
);

const LoggedOutRoutes = props => (
  <Switch>
    <Route exact path="/login" component={LoginContainer} />
    <Redirect exact to="/login" state={{ from: props.location }} />
  </Switch>
);

const Routes = ({ isAuthenticated }, ...props) => {
  return isAuthenticated ? (
    <LoggedInRoutes {...props} />
  ) : (
    <LoggedOutRoutes {...props} />
  );
};

export default Routes;
