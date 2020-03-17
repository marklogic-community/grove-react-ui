import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import SingleFilterList from './SingleFilterList';

describe('<SingleFilterList/>', () => {
  it('renders without values', () => {
    expect(
      shallow(<SingleFilterList values={[]} addFilter={() => {}} />).length
    ).toEqual(1);
  });

  it('renders with values', () => {
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        addFilter={() => {}}
      />
    );
    expect(wrapper.length).toEqual(1);
    expect(
      wrapper
        .find('.nonSelectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
  });

  it('handles selected values differently', () => {
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        selectedValues={['value1']}
        addFilter={() => {}}
      />
    );
    expect(
      wrapper
        .find('.nonSelectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(false);
    expect(
      wrapper
        .find('.selectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
  });

  it('shows a single selected value', () => {
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        selectedValues={['value1']}
        addFilter={() => {}}
      />
    );
    expect(
      wrapper
        .find('.nonSelectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(false);
    expect(
      wrapper
        .find('.selectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
  });

  it('shows two selected values', () => {
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        selectedValues={['value1', 'value2']}
        addFilter={() => {}}
      />
    );
    expect(
      wrapper
        .find('.selectedFilterValues')
        .contains(<span title="value1"> value1</span>)
    ).toBe(true);
    expect(
      wrapper
        .find('.selectedFilterValues')
        .contains(<span title="value2"> value2</span>)
    ).toBe(true);
  });

  it('allows a value to be selected', () => {
    const addFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        addFilter={addFilterSpy}
      />
    );
    wrapper
      .find('.nonSelectedFilterValues .ml-facet-add-pos')
      .first()
      .simulate('click');
    expect(addFilterSpy).toHaveBeenCalledWith('value1');
  });

  it('allows a value to be de-selected', () => {
    const removeFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <SingleFilterList
        values={[
          { name: 'value1', value: 'value1', count: 1 },
          { name: 'value2', value: 'value2', count: 2 }
        ]}
        addFilter={() => {}}
        removeFilter={removeFilterSpy}
        selectedValues={['value1']}
      />
    );
    wrapper
      .find('.selectedFilterValues .ml-facet-remove-filter')
      .simulate('click');
    expect(removeFilterSpy).toHaveBeenCalledWith('value1');
  });
});
