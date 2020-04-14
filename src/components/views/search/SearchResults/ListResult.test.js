import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import { mockResults } from '../test/mockData';

import ListResult from './ListResult';
import SearchSnippet from './SearchSnippet.js';

describe('<ListResult />', () => {
  const result = mockResults[0];

  it('renders snippets', () => {
    const wrapper = shallow(<ListResult result={result} />);
    expect(wrapper.find(SearchSnippet).length).toEqual(result.matches.length);
  });

  // TODO: Problem with testing <Link> outside a <Router>
  // it('renders the label provided', () => {
  //   const rendered = render(<ListResult result={result} />);
  //   expect(rendered.text()).toContain(result.label);
  // });
});
