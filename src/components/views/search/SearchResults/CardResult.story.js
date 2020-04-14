/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

// TODO: can we get rid of this router dependency?
import { BrowserRouter } from 'react-router-dom';
import CardResult from './CardResult';

import { mockResults } from '../test/mockData.js';

storiesOf('SearchView/SearchResponseView/SearchResults/CardResult', module)
  .add('with label', () => (
    <BrowserRouter>
      <CardResult result={mockResults[0]} />
    </BrowserRouter>
  ))
  .add('with long text', () => (
    <BrowserRouter>
      <CardResult result={mockResults[2]} />
    </BrowserRouter>
  ))
  .add('without label', () => (
    <BrowserRouter>
      <CardResult result={mockResults[3]} />
    </BrowserRouter>
  ));
