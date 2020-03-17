import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';

import SearchResponseView from './SearchResponseView';
import SearchResults from './SearchResults/SearchResults';
import SearchMetrics from './SearchMetrics';

describe('<SearchResponseView />', () => {
  it('renders', () => {
    shallow(<SearchResponseView />);
  });

  it('renders metrics and results if search successful', () => {
    const wrapper = shallow(<SearchResponseView />);
    expect(wrapper.find(SearchMetrics).length).toEqual(1);
    expect(wrapper.find(SearchResults).length).toEqual(1);
  });

  it('does not render metrics and results if there is an error', () => {
    const wrapper = shallow(<SearchResponseView error={'Some error'} />);
    expect(wrapper.find(SearchMetrics).length).toEqual(0);
    expect(wrapper.find(SearchResults).length).toEqual(0);
  });
});
