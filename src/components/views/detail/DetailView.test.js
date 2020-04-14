import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import DetailView from './DetailView';

describe('<DetailView />', () => {
  it('renders without crashing', () => {
    expect(shallow(<DetailView loadDetail={() => {}} />).length).toEqual(1);
  });
});
