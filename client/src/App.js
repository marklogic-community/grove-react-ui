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
import {
  actions as documentActions,
  selectors as documentSelectors
} from 'ml-documents-redux';

// TODO: extract into a utility: also used within redux modules
const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args)
  }
}
const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint)
    return bound
  }, {})
}

const boundSearchSelectors = bindSelectors(searchSelectors, 'search');
const boundDocumentSelectors = bindSelectors(documentSelectors, 'documents');

class App extends Component {
  render() {
    return (
      <div>
        <MLNavbar title="MarkLogic UI Toolkit" />
        <Grid fluid={true}>
          <Switch>
            <Route exact path="/"
              render={() => (
                <MLSearchContainer
                  actions={searchActions}
                  selectors={boundSearchSelectors}
                />
              )}
            />
            <Route path="/detail/:uri*"
              render={(props) => (
                <MLDetailContainer
                  uri={decodeURIComponent(props.match.params.uri)}
                  actions={documentActions}
                  selectors={boundDocumentSelectors}
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
