/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import SearchResults from './SearchResults';

import { mockResults } from '../test/mockData.js';

storiesOf('SearchView/SearchResponseView/SearchResults', module)
  .add('with results', () => (
    <BrowserRouter>
      <div className="col-md-12">
        <SearchResults results={mockResults} />
      </div>
    </BrowserRouter>
  ))
  .add('with no results', () => (
    <BrowserRouter>
      <div className="col-md-12">
        <SearchResults results={[]} />
      </div>
    </BrowserRouter>
  ));
