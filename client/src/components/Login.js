import React from 'react';
import PropTypes from 'prop-types';
import {
  Row,
  Col,
  Jumbotron,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';

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
      <Row>
        <Col md={6} mdOffset={3}>
          <Jumbotron>
            <form onSubmit={this.handleLoginSubmission}>
              <FormGroup>
                <FormControl
                  type="text"
                  placeholder="Username"
                  onChange={this.setUsername}
                />
              </FormGroup>
              <FormGroup>
                <FormControl
                  type="password"
                  placeholder="Password"
                  onChange={this.setPassword}
                />
              </FormGroup>
              <Button type="submit" bsStyle="primary" className="btn-raised">
                Sign in
              </Button>
            </form>
          </Jumbotron>
        </Col>
      </Row>
    );
  }
}

Login.propTypes = {
  submitLogin: PropTypes.func
};

export default Login;
