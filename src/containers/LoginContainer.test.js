/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import LoginContainer from './LoginContainer';

describe('<LoginContainer />', () => {
  const mockStore = {
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => {}
  };

  it('works', () => {
    shallow(<LoginContainer store={mockStore} />);
  });
});
