import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  SearchContainer,
  DetailContainer,
  CreateContainer,
  LoginContainer
} from 'grove-core-react-redux-containers';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" render={() => <SearchContainer />} />
    <Route
      exact
      path="/detail/:id*"
      render={props => {
        const pathParts = window.location.pathname.split('/');
        // React Router tries to decode the id, but inconsistently
        // It breaks when back-forward clicked in browser
        return <DetailContainer id={pathParts[pathParts.length - 1]} />;
      }}
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
