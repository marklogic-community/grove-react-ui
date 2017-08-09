import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

it('renders, integrated with children, without crashing', () => {
  mount(<App />);
});
