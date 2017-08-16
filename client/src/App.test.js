import React from 'react';
import { shallow, mount } from 'enzyme';
import App from './App';

it('renders without crashing', () => {
  shallow(<App />);
});

// Do we need such a test? Maybe just from the highest level
// it('renders, integrated with children, without crashing', () => {
//   mount(<App />);
// });
