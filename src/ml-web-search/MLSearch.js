import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import MLSearchBar from './MLSearchBar';
import MLSearchResults from './MLSearchResults';

import { mockResults } from './test/mockData';

class MLSearch extends Component {
  render() {
    return (
      <Grid>
        <Row>
          <Col md={3}/>
          <Col md={9}>
            <Row>
              <MLSearchBar />
            </Row>
            <Row>
              <MLSearchResults results={mockResults}/>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}

export default MLSearch;
