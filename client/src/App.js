import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import MLSearchContainer from './containers/MLSearchContainer';
import { MLNavbar } from 'ml-treehouse';

import { searchActions, searchSelectors } from 'ml-search-redux';

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <Grid fluid={true}>
          <MLSearchContainer
            runSearch={searchActions.runSearch}
            selectors={searchSelectors}/>
        </Grid>
      </div>
    );
  }
}

export default App;
