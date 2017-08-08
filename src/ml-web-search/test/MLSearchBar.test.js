import React from 'react';
import ReactDOM from 'react-dom';
import MLSearchBar from '../MLSearchBar';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MLSearchBar />, div);
});
