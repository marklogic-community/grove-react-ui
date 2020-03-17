import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import CurrentFilters from './CurrentFilters';

describe('<CurrentFilters/>', () => {
  it('renders without filters', () => {
    expect(
      shallow(<CurrentFilters filters={[]} removeFilter={() => {}} />).length
    ).toEqual(1);
  });

  it('renders with filters', () => {
    const wrapper = shallow(
      <CurrentFilters
        filters={[
          {
            constraint: 'Test',
            mode: 'and',
            value: ['value1', 'value2']
          }
        ]}
        removeFilter={() => {}}
      />
    );
    expect(wrapper.length).toEqual(1);
    expect(wrapper.find('.grove-current-filter').length).toEqual(1);
  });

  it('does not show filters with non-string and non-numeric values', () => {
    const wrapper = shallow(
      <CurrentFilters
        removeFilter={() => {}}
        filters={[
          {
            constraint: 'location',
            mode: 'and',
            constraintType: 'geospatial',
            value: [
              {
                south: 32,
                north: 31,
                west: 30,
                east: 29
              }
            ]
          }
        ]}
      />
    );
    expect(wrapper.find('.grove-current-filter').length).toEqual(0);
  });
});
