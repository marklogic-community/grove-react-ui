import React from 'react';
import PropTypes from 'prop-types';
import { FormGroup, FormControl, Button } from 'react-bootstrap';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  handleLoginSubmission(e) {
    e.preventDefault();
    this.props.submitLogin(this.state.username, this.state.password);
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    return (
      <form onSubmit={this.handleLoginSubmission}>
        <FormGroup>
          <FormControl
            type="text"
            name="username"
            placeholder="Username"
            onChange={this.setUsername}
          />
        </FormGroup>
        <FormGroup>
          <FormControl
            type="password"
            name="password"
            placeholder="Password"
            onChange={this.setPassword}
          />
        </FormGroup>
        <Button type="submit" bsStyle="primary" className="btn-raised">
          Sign in
        </Button>
      </form>
    );
  }
}

Login.propTypes = {
  submitLogin: PropTypes.func
};

export default Login;
