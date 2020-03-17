/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchSnippet from './SearchSnippet';

storiesOf('SearchView/SearchResponseView/SearchResults/SearchSnippet', module)
  .add('with highlights', () => (
    <SearchSnippet
      match={{
        'match-text': [
          'I know how to display ',
          { highlight: 'highlighted' },
          ' text. Like ',
          { highlight: 'this' },
          ' and ',
          { highlight: 'that.' }
        ]
      }}
    />
  ))
  .add('no highlights', () => (
    <SearchSnippet
      match={{
        'match-text': ['I can also handle text with no highlights, of course.']
      }}
    />
  ));
