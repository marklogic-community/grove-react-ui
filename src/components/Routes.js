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
        path="/detail"
        render={props => {
          // Prefer to get id from the state
          let id = props.location.state && props.location.state.id;
          if (!id) {
            // if it isn't in the state, try to get it from the search params
            // Using search parameters because React Router does bad encoding
            // for path parameters
            // See https://github.com/ReactTraining/history/issues/505
            const idMatch = props.location.search.match(/[?|&]id=([^&]+)/);
            if (idMatch) {
              id = idMatch[1];
            }
          }
          return <DetailContainer id={id} />;
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
