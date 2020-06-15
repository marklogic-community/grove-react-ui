import React from 'react';
import { Row, Col, Jumbotron } from 'react-bootstrap';
import Login from './Login';

const LoginJumbotron = props => (
  <Row>
    <Col md={6} className="offset-md-3">
      <Jumbotron>
        <Login {...props} />
      </Jumbotron>
    </Col>
  </Row>
);

export default LoginJumbotron;
