import React from 'react';
import { shallow, mount } from 'enzyme';
import expect, { createSpy } from 'expect';
import SearchBar from './SearchBar';

describe('<SearchBar />', () => {
  it('renders without crashing', () => {
    expect(shallow(<SearchBar />).length).toEqual(1);
  });

  it('displays queryText', () => {
    const wrapper = shallow(<SearchBar queryText="myQuery" />);
    expect(wrapper.find('.ml-qtext-input').props().value).toEqual('myQuery');
  });

  it('shows a default placeholder', () => {
    const wrapper = shallow(<SearchBar />);
    expect(wrapper.find('.ml-qtext-input').props().placeholder).toEqual(
      'Search...'
    );
  });

  it('allows custom placeholder', () => {
    const wrapper = shallow(<SearchBar placeholder="Please Search!" />);
    expect(wrapper.find('.ml-qtext-input').props().placeholder).toEqual(
      'Please Search!'
    );
  });

  it('calls correct function on queryText change', () => {
    const myHandleChange = createSpy();
    const wrapper = shallow(<SearchBar onQueryTextChange={myHandleChange} />);
    wrapper
      .find('.ml-qtext-input')
      .simulate('change', { target: { value: 'h' } });
    expect(myHandleChange).toHaveBeenCalledWith('h');
  });

  it('calls correct function on queryText clear', () => {
    const myHandleChange = createSpy();
    const wrapper = shallow(<SearchBar onQueryTextChange={myHandleChange} />);
    wrapper.find('.ml-qtext-clear').simulate('click');
    expect(myHandleChange).toHaveBeenCalledWith('');
  });

  it('calls correct function on search execute', () => {
    const mySearch = createSpy();
    const wrapper = mount(<SearchBar onSearchExecute={mySearch} />);
    wrapper.find('button.ml-execute-search').simulate('submit');
    expect(mySearch).toHaveBeenCalled();
  });

  it('disables search button when search is pending', () => {
    const mySearch = createSpy();
    // Have to call mount to stop enzyme from clicking disabled button
    const wrapper = mount(
      <SearchBar onSearchExecute={mySearch} searchPending={true} />
    );
    wrapper.find('button.ml-execute-search').simulate('click');
    expect(mySearch).toNotHaveBeenCalled();
  });
});
