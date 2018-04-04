import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import MLSearchContainer from '../containers/MLSearchContainer';
import MLDetailContainer from '../containers/MLDetailContainer';
import Login from '../containers/LoginContainer';

const LoggedInRoutes = () => (
  <Switch>
    <Route exact path="/" render={() => <MLSearchContainer />} />
    <Route
      exact
      path="/detail/:uri*"
      render={props => (
        <MLDetailContainer uri={decodeURIComponent(props.match.params.uri)} />
      )}
    />
    <Redirect from="/login" to="/" />
  </Switch>
);

const LoggedOutRoutes = props => (
  <Switch>
    <Route exact path="/login" component={Login} />
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
