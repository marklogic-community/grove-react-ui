/* eslint-env jest */
import React from 'react';
import { shallow } from 'enzyme';
import AppContainer from './AppContainer';

describe('<AppContainer />', () => {
  const mockStore = {
    getState: () => ({
      user: {
        currentUser: ''
      }
    }),
    dispatch: () => {},
    subscribe: () => {}
  };

  it('works', () => {
    shallow(<AppContainer render={() => {}} store={mockStore} />);
  });
});
