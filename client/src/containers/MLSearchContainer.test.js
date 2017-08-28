import React from 'react';
import MLSearchContainer from './MLSearchContainer';
import { shallow, mount } from 'enzyme';

describe('<MLSearchContainer />', () => {
  const mockStore = {
    getState: () => ({
      search: {
        response: {
          results: []
        }
      }
    }),
    dispatch: () => {},
    subscribe: () => {}
  };

  it('works', () => {
    shallow(<MLSearchContainer store={mockStore}/>);
  });

  it('runs a search', () => {
    const searchSpy = jest.fn();
    searchSpy.mockReturnValue(Promise.resolve([]));
    const wrapper = mount(
      <MLSearchContainer runSearch={searchSpy} store={mockStore}/>
    );
    wrapper.find('.ml-execute-search').simulate('click');
    expect(searchSpy.mock.calls.length).toBe(1);
  });

});
