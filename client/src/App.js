import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { MLNavbar, MLSearchView } from 'ml-treehouse';

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <Grid fluid={true}>
          <MLSearchView />
        </Grid>
      </div>
    );
  }
}

export default App;
