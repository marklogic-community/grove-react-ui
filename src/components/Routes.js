import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import {
  SearchContainer,
  DetailContainer,
  CreateContainer,
  LoginContainer
} from 'grove-core-react-redux-containers';

const PrivateRoute = ({
  component: Component,
  render,
  isAuthenticated,
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated ? (
          render ? (
            render(props)
          ) : (
            <Component {...props} />
          )
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: props.location }
            }}
          />
        )
      }
    />
  );
};

const Routes = ({ isAuthenticated }, ...rest) => {
  return (
    <Switch>
      <Route
        exact
        path="/login"
        render={props => {
          return isAuthenticated ? (
            <Redirect
              to={(props.location.state && props.location.state.from) || '/'}
            />
          ) : (
            <LoginContainer />
          );
        }}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/"
        render={() => <SearchContainer />}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/detail/:id*"
        render={props => {
          const pathParts = window.location.pathname.split('/');
          // React Router tries to decode the id param, but inconsistently
          // It breaks when back-forward clicked in browser
          // See https://github.com/ReactTraining/history/issues/505
          // for current status or recommended workarounds.
          return <DetailContainer id={pathParts[pathParts.length - 1]} />;
        }}
      />
      <PrivateRoute
        isAuthenticated={isAuthenticated}
        exact
        path="/create"
        render={() => <CreateContainer redirectPath="/detail" />}
      />
    </Switch>
  );
};

export default Routes;
