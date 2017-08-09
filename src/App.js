import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import MLSearch from './ml-treehouse-search/MLSearch';
import MLNavbar from './ml-treehouse-navbar/MLNavbar';

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <Grid fluid={true}>
          <MLSearch />
        </Grid>
      </div>
    );
  }
}

export default App;
