/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import SearchResponseView from './SearchResponseView';

import { mockResults } from './test/mockData.js';

storiesOf('SearchView/SearchResponseView', module)
  .add('with results', () => (
    <BrowserRouter>
      <div className="col-md-12">
        <SearchResponseView
          results={mockResults}
          executionTime={10.3456}
          total={99}
          page={1}
          totalPages={10}
          handlePageSelection={action('handlePageSelection')}
        />
      </div>
    </BrowserRouter>
  ))
  .add('with no results', () => (
    <div className="col-md-12">
      <SearchResponseView results={[]} total={0} executionTime={9.9808} />
    </div>
  ))
  .add('with an error', () => (
    <div className="col-md-12">
      <SearchResponseView error="ERROR: This is an error." />
    </div>
  ));

// TODO: with results, error
