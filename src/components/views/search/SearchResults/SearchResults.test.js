import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SearchResults from './SearchResults';
import CardResult from './CardResult';

import { mockResults } from '../test/mockData';

describe('<SearchResults />', () => {
  it('renders empty results without crashing', () => {
    shallow(<SearchResults results={[]} />);
  });

  it('renders results without crashing', () => {
    shallow(<SearchResults results={mockResults} />);
  });

  it('renders an CardResult for each result', () => {
    const wrapper = shallow(<SearchResults results={mockResults} />);
    expect(wrapper.find(CardResult).length).toEqual(mockResults.length);
  });
});
