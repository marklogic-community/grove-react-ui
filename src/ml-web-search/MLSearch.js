import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MLSearchBar } from './MLSearchBar.js';

export class MLSearch extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={3}/>
          <Col md={9}>
            <MLSearchBar />
          </Col>
        </Row>
      </Grid>
    );
  }
}

