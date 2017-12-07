import React, { Component } from 'react';
import { Grid } from 'react-bootstrap';
import { Switch, Route } from 'react-router-dom';

import MLSearchContainer from './containers/MLSearchContainer';
import MLDetailContainer from './containers/MLDetailContainer';
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
          <Switch>
            <Route exact path="/"
              render={() => (
                <MLSearchContainer
                  actions={searchActions}
                  selectors={wrappedSearchSelectors}
                />
              )}
            />
            <Route path="/detail/:uri*"
              render={(props) => (
                <MLDetailContainer
                  uri={props.match.params.uri}
                  actions={searchActions}
                  selectors={wrappedSearchSelectors}
                />
              )}
            />
          </Switch>
        </Grid>
      </div>
    );
  }
}

export default App;
