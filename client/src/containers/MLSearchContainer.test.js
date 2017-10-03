import React from 'react';
import MLSearchContainer from './MLSearchContainer';
import { shallow, mount } from 'enzyme';

describe('<MLSearchContainer />', () => {
  const mockStore = {
    // we mock the selectors instead of knowing state structure
    getState: () => ({}),
    dispatch: () => {},
    subscribe: () => {}
  };

  const mockSelectors = {
    getSearchResults: jest.fn().mockReturnValue([]),
    getVisibleQtext: jest.fn().mockReturnValue(''),
    getSearchExecutionTime: jest.fn(),
    getSearchTotal: jest.fn(),
    getSearchTotalPages: jest.fn(),
    getPage: jest.fn(),
    getPreExecutedQuery: jest.fn(),
    isSearchPending: jest.fn(),
    isSearchComplete: jest.fn(),
  };

  it('works', () => {
    shallow(<MLSearchContainer
      actions={{}}
      store={mockStore}
      selectors={mockSelectors}/>);
  });

  it('runs a search', () => {
    const searchSpy = jest.fn();
    searchSpy.mockReturnValue(Promise.resolve([]));
    const mockActions = {
      runSearch: searchSpy
    };
    const wrapper = mount(
      <MLSearchContainer
        actions={mockActions}
        store={mockStore}
        selectors={mockSelectors} />
    );
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(searchSpy.mock.calls.length).toBe(1);
  });

});
