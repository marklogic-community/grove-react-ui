import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import { MLSearch } from './ml-web-search/MLSearch.js';

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
        <MLSearch />
      </div>
    );
  }
}

export default App;
