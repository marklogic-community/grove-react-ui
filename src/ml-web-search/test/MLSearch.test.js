import React from 'react';
import { shallow, mount } from 'enzyme';
import MLSearch from '../MLSearch';

it('renders without crashing', () => {
  shallow(<MLSearch />);
});

it('renders, integrated with children, without crashing', () => {
  mount(<MLSearch />);
});
