import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import { Navbar } from './Navbar';

describe('<Navbar />', () => {
  it('renders without crashing', () => {
    expect(shallow(<Navbar />).length).toEqual(1);
  });

  it('includes the title', () => {
    // Have to render to to see into a child. Is there a better way?
    const wrapper = render(<Navbar title="MyNavbarTitle" withoutUser={true} />);
    expect(wrapper.text()).toContain('MyNavbarTitle');
  });

  //TODO: test with user
});
