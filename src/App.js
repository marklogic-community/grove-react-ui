import React, { Component } from 'react';
import { Grid, Navbar, Row, Col } from 'react-bootstrap';
import { MLSearchBar } from './ml-web-search/MLSearchBar.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">MarkLogic Redwood</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid>
          <Row>
            <Col md={3}/>
            <Col md={9}>
              <MLSearchBar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
