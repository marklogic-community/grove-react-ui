import React from 'react';
import { render } from 'enzyme';
import expect from 'expect';

import SearchMetrics from './SearchMetrics';

describe('<SearchMetrics />', () => {
  it('renders rounded time and total number of results', () => {
    const rendered = render(<SearchMetrics time={0.0109} total={99} />);
    const renderedText = rendered.text();
    expect(renderedText).toContain('0.011 seconds');
    expect(renderedText).toContain('99 results');
  });
});
