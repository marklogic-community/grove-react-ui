import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import MLSearchContainer from './MLSearchContainer';
import { MLNavbar } from 'ml-treehouse';

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <Grid fluid={true}>
          <MLSearchContainer />
        </Grid>
      </div>
    );
  }
}

export default App;
