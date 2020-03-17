import React from 'react';
import { shallow } from 'enzyme';
import expect from 'expect';
import MultiFilterList from './MultiFilterList';

describe('<MultiFilterList/>', () => {
  it('renders', () => {
    expect(
      shallow(<MultiFilterList values={[]} addFilter={() => {}} />).length
    ).toEqual(1);
  });

  it('renders with values', () => {
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
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

  it('shows a single selected value', () => {
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }]}
        removeFilter={() => {}}
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
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        selectedValues={[{ value: 'value1' }, { value: 'value2' }]}
        addFilter={() => {}}
        removeFilter={() => {}}
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
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addFilter={addFilterSpy}
      />
    );
    wrapper
      .find('.nonSelectedFilterValue .ml-facet-add-pos')
      .first()
      .simulate('change');
    expect(addFilterSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addFilterSpy).toHaveBeenCalledWith('value1');
  });

  it('does not select a value when it is checked, then unchecked', () => {
    const addFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addFilter={addFilterSpy}
      />
    );
    const checkbox = wrapper
      .find('.nonSelectedFilterValue .ml-facet-add-pos')
      .first();
    checkbox.simulate('change');
    checkbox.simulate('change');
    expect(addFilterSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addFilterSpy).toNotHaveBeenCalled();
  });

  // TODO
  it('allows two values to be selected', () => {
    const addFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addFilter={addFilterSpy}
      />
    );
    const checkboxes = wrapper.find(
      '.nonSelectedFilterValue .ml-facet-add-pos'
    );
    checkboxes.first().simulate('change');
    checkboxes.last().simulate('change');
    expect(addFilterSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(addFilterSpy).toHaveBeenCalledWith('value1');
    expect(addFilterSpy).toHaveBeenCalledWith('value2');
  });

  it('allows a value to be de-selected', () => {
    const removeFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addFilter={() => {}}
        removeFilter={removeFilterSpy}
        selectedValues={[{ value: 'value1' }]}
      />
    );
    wrapper.find('.ml-facet-remove-filter').simulate('change');
    expect(removeFilterSpy).toNotHaveBeenCalled();
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(removeFilterSpy).toHaveBeenCalledWith('value1');
  });

  it('does not de-select value unchecked then re-checked', () => {
    const removeFilterSpy = expect.createSpy();
    const wrapper = shallow(
      <MultiFilterList
        values={[{ value: 'value1', count: 1 }, { value: 'value2', count: 2 }]}
        addFilter={() => {}}
        removeFilter={removeFilterSpy}
        selectedValues={[{ value: 'value1' }]}
      />
    );
    const checkbox = wrapper.find('.ml-facet-remove-filter');
    checkbox.simulate('change');
    checkbox.simulate('change');
    wrapper.find('.ml-facet-apply').simulate('click');
    expect(removeFilterSpy).toNotHaveBeenCalled();
  });
});
