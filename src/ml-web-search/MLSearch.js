import React, { Component } from 'react';
import { Grid, Row, Col } from 'react-bootstrap';
import { MLSearchBar } from './MLSearchBar.js';
import  MLSearchResults  from './MLSearchResults.js';

const results = [
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'Another Search Result',
    matches: []
  },
  {
    label: 'A Search Result With a Particularly Long Label, Don\'t You Think?',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
  {
    label: 'A Search Result',
    matches: []
  },
];

export class MLSearch extends Component {
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
              <MLSearchResults results={results}/>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
