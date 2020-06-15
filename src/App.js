import React from 'react';
import { Container } from 'react-bootstrap';
import { withRouter } from 'react-router-dom';

import AppContainer from './containers/AppContainer';

import Routes from './components/Routes';
import Header from './components/Header';
import 'font-awesome/css/font-awesome.min.css';

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
        <Container fluid={true}>
          <Routes {...props} />
        </Container>
      </div>
    )}
  />
);

export default withRouter(App);
