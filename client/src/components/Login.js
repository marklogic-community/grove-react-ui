import React from 'react';
import {
  Row,
  Col,
  Jumbotron,
  FormGroup,
  FormControl,
  Button
} from 'react-bootstrap';
import { Redirect } from 'react-router';
require('isomorphic-fetch');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      redirectToReferrer: false
    };
    this.handleLoginSubmission = this.handleLoginSubmission.bind(this);
    this.setUsername = this.setUsername.bind(this);
    this.setPassword = this.setPassword.bind(this);
  }

  handleLoginSubmission(e) {
    e.preventDefault();
    return fetch(new URL('/api/user/login', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(this.state)
    }).then(response => {
      if (response.ok) {
        this.setState({ redirectToReferrer: true });
      }
    });
  }

  setUsername(e) {
    this.setState({ username: e.target.value });
  }

  setPassword(e) {
    this.setState({ password: e.target.value });
  }

  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    if (this.state.redirectToReferrer) {
      return <Redirect to={from} />;
    }

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

export default Login;
