import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import Login from './Login';

describe('<Login />', () => {
  it('renders', () => {
    expect(shallow(<Login />).length).toEqual(1);
  });
});
