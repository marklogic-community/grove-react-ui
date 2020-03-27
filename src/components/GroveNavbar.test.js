import React from 'react';
import { shallow, render } from 'enzyme';
import expect from 'expect';
import { GroveNavbar } from './GroveNavbar';

describe('<GroveNavbar />', () => {
  it('renders without crashing', () => {
    expect(shallow(<GroveNavbar />).length).toEqual(1);
  });

  it('includes the title', () => {
    // Have to render to to see into a child. Is there a better way?
    const wrapper = render(
      <GroveNavbar title="MyNavbarTitle" withoutUser={true} />
    );
    expect(wrapper.text()).toContain('MyNavbarTitle');
  });

  //TODO: test with user
});
