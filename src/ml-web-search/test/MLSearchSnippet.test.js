import React from 'react';
import ReactDOM from 'react-dom';
import MLSearchSnippet from '../MLSearchSnippet';

it('renders an empty match without crashing', () => {
  const match = {
    'match-text': []
  };
  const div = document.createElement('div');
  ReactDOM.render(<MLSearchSnippet match={match} />, div);
});

it('renders a match without crashing', () => {
  const match = {
    'match-text': [
      'We found the word ',
      {highlight: 'clandestine '},
      'for you.'
    ]
  };
  const div = document.createElement('div');
  ReactDOM.render(<MLSearchSnippet match={match} />, div);
});
