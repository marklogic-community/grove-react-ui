/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { BrowserRouter } from 'react-router-dom';

import SearchView from './SearchView';

import { mockResults } from './test/mockData';
import { defaultNonSelectedFacets } from './Facets/Facets.story';

storiesOf('SearchView', module).add('displaying results', () => (
  <BrowserRouter>
    <SearchView
      stagedSearch={{}}
      queryText=""
      handleQueryTextChange={action('handleQueryTextChange')}
      runSearch={action('runSearch')}
      facets={defaultNonSelectedFacets}
      addFilter={action('addFilter')}
      activeFilters={[]}
      removeFilter={action('removeFilter')}
      isSearchComplete={true}
      total={209}
      results={mockResults}
      executionTime={0.01232324}
      totalPages={21}
      page={1}
      changePage={action('changePage')}
      handlePageSelection={action('handlePageSelection')}
    />
  </BrowserRouter>
));
