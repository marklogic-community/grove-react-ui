import React from 'react';
import ReactDOM from 'react-dom';
import MLSearchResults from '../MLSearchResults';

import { mockResults } from './mockData';

it('renders empty results without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MLSearchResults results={[]} />, div);
});

it('renders results without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MLSearchResults results={mockResults} />, div);
});
