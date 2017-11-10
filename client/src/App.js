import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';

import MLSearchContainer from './containers/MLSearchContainer';
import { MLNavbar } from 'ml-treehouse-react';

import {
  actions as searchActions,
  selectors as searchSelectors
} from 'ml-search-redux';

const wrappedSearchSelectors = Object.keys(searchSelectors).reduce(
  (newSelectors, name) => {
    newSelectors[name] = state => searchSelectors[name](state.search)
    return newSelectors;
  },
  {}
);

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic Treehouse" />
        <Grid fluid={true}>
          <MLSearchContainer
            actions={searchActions}
            selectors={wrappedSearchSelectors}
          />
        </Grid>
      </div>
    );
  }
}

export default App;
