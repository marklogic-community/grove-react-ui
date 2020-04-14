import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CreateView from './CreateView';

describe('<CreateView />', () => {
  it('renders without crashing', () => {
    expect(shallow(<CreateView />).length).toEqual(1);
  });
});
