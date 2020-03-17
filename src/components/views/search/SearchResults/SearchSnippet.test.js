import React from 'react';
import { shallow, render } from 'enzyme';
import SearchSnippet from './SearchSnippet';

it('renders an empty match without crashing', () => {
  const match = {
    'match-text': []
  };
  shallow(<SearchSnippet match={match} />);
});

it('renders a match without crashing', () => {
  const match = {
    'match-text': [
      'We found the word ',
      { highlight: 'clandestine ' },
      'for you.'
    ]
  };
  shallow(<SearchSnippet match={match} />);
});

it('renders a single highlight without crashing', () => {
  const match = {
    'match-text': [{ highlight: 0 }]
  };
  render(<SearchSnippet match={match} />);
});
