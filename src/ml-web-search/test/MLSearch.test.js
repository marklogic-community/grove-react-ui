import React from 'react';
import ReactDOM from 'react-dom';
import MLSearch from '../MLSearch';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MLSearch />, div);
});
