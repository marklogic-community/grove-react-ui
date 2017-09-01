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
    getSearchResults: jest.fn().mockReturnValue([])
  };

  it('works', () => {
    shallow(<MLSearchContainer
      store={mockStore}
      selectors={mockSelectors}/>);
  });

  it('runs a search', () => {
    const searchSpy = jest.fn();
    searchSpy.mockReturnValue(Promise.resolve([]));
    const wrapper = mount(
      <MLSearchContainer
        runSearch={searchSpy}
        store={mockStore}
        selectors={mockSelectors} />
    );
    wrapper.find('.ml-execute-search').simulate('submit');
    expect(searchSpy.mock.calls.length).toBe(1);
  });

});
