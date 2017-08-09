import React from 'react';
import { shallow } from 'enzyme';
import MLSearchBar from '../MLSearchBar';

it('renders without crashing', () => {
  shallow(<MLSearchBar />);
});
