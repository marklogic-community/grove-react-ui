import React from 'react';
import { render, shallow } from 'enzyme';
import expect from 'expect';
import { mockResults } from '../test/mockData';

import CardResult from './CardResult';
import SearchSnippet from './SearchSnippet.js';

describe('<CardResult />', () => {
  const result = mockResults[0];

  // TODO: Problem with testing <Link> outside a <Router>
  xit('renders snippets', () => {
    const wrapper = render(<CardResult result={result} />);
    expect(wrapper.find(SearchSnippet).length).toEqual(result.matches.length);
  });

  it('renders without crashing', () => {
    shallow(<CardResult result={result} />);
  });
});
