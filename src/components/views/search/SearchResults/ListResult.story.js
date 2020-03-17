/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import ListResult from './ListResult';

import { mockResults } from '../test/mockData.js';

storiesOf('SearchView/SearchResponseView/SearchResults/ListResult', module)
  .add('with label', () => (
    <BrowserRouter>
      <ListResult result={mockResults[0]} />
    </BrowserRouter>
  ))
  .add('with long text', () => (
    <BrowserRouter>
      <ListResult result={mockResults[2]} />
    </BrowserRouter>
  ))
  .add('without label', () => (
    <BrowserRouter>
      <ListResult result={mockResults[3]} />
    </BrowserRouter>
  ));
