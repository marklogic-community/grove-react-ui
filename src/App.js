import React from 'react';
import { Grid } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AppContainer from './containers/AppContainer';

import Routes from './components/Routes';
import Header from './components/Header';

const App = appProps => (
  <AppContainer
    {...appProps}
    render={props => (
      <div>
        <Header
          isAuthenticated={props.isAuthenticated}
          currentUsername={props.currentUser}
          submitLogout={props.submitLogout}
        />
        <Grid fluid={true}>
          <Routes {...props} />
        </Grid>
      </div>
    )}
  />
);

export default withRouter(App);
