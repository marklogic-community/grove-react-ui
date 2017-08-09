import React from 'react';
import { shallow } from 'enzyme';
import MLSearchSnippet from '../MLSearchSnippet';

it('renders an empty match without crashing', () => {
  const match = {
    'match-text': []
  };
  shallow(<MLSearchSnippet match={match} />);
});

it('renders a match without crashing', () => {
  const match = {
    'match-text': [
      'We found the word ',
      {highlight: 'clandestine '},
      'for you.'
    ]
  };
  shallow(<MLSearchSnippet match={match} />);
});
