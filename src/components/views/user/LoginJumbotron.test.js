import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import LoginJumbotron from './LoginJumbotron';

describe('<LoginJumbotron />', () => {
  it('renders', () => {
    expect(shallow(<LoginJumbotron />).length).toEqual(1);
  });
});
