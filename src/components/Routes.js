import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  DetailContainer,
  CreateContainer,
  LoginContainer
} from 'grove-core-react-redux-containers';
import SearchContainer from '../containers/SearchContainer';

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
    <Route
      exact
      path="/create"
      render={() => <CreateContainer redirectPath="/detail" />}
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
