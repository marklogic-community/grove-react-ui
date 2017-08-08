import React, { Component } from 'react';
import { Grid, Navbar } from 'react-bootstrap';
import MLSearch from './ml-web-search/MLSearch.js';

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">MarkLogic Treehouse</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid fluid={true}>
          <MLSearch />
        </Grid>
      </div>
    );
  }
}

export default App;
