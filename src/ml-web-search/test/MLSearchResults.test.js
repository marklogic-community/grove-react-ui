import React from 'react';
import { shallow } from 'enzyme';
import MLSearchResults from '../MLSearchResults';

import { mockResults } from './mockData';

it('renders empty results without crashing', () => {
  shallow(<MLSearchResults results={[]} />);
});

it('renders results without crashing', () => {
  shallow(<MLSearchResults results={mockResults} />);
});
