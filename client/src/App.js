import React from 'react';
import { Grid } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router-dom';

import {
  actions as userActions,
  selectors as userSelectors
} from './muir-user-redux';
import { bindSelectors } from './utils/redux-utils';

import Routes from './components/Routes';
import Navbar from './components/Navbar';

const boundUserSelectors = bindSelectors(userSelectors, 'user');

class App extends React.Component {
  componentDidMount() {
    if (!this.props.currentUser) {
      this.props.getAuthenticationStatus();
    }
  }

  render() {
    return (
      <div>
        <Navbar
          isAuthenticated={this.props.isAuthenticated}
          currentUsername={this.props.currentUser}
          submitLogout={this.props.submitLogout}
        />
        <Grid fluid={true}>
          <Routes {...this.props} />
        </Grid>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    isAuthenticated: boundUserSelectors.isCurrentUserAuthenticated(state),
    currentUser: boundUserSelectors.currentUser(state),
    ...ownProps
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    submitLogout: userActions.submitLogout,
    getAuthenticationStatus: userActions.getAuthenticationStatus
  }, dispatch);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
