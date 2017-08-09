import React from 'react';
import { shallow, mount } from 'enzyme';
import MLNavbar from './MLNavbar';

it('renders without crashing', () => {
  shallow(<MLNavbar />);
});

it('includes the title', () => {
  // Have to mount to see into a child. Is there a better way?
  const wrapper = mount(<MLNavbar title="MyNavbarTitle"/>);
  expect(wrapper.find('.navbar-brand')).toIncludeText("MyNavbarTitle");
});
