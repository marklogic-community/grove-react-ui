import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import MLSearchContainer from './containers/MLSearchContainer';
import { MLNavbar } from 'ml-treehouse';

import { runSearch, selectors as searchSelectors } from './modules/search';

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse"/>
        <Grid fluid={true}>
          <MLSearchContainer
            runSearch={runSearch}
            selectors={searchSelectors}/>
        </Grid>
      </div>
    );
  }
}

export default App;
