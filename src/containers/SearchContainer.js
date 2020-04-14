import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchView from '../components/views/search/SearchView';

import { actions, selectors } from '../redux/search';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'search');

let SearchContainer = class SearchContainer extends Component {
  render() {
    return <SearchView {...this.props} detailPath="/detail/" />;
  }
};

const mapStateToProps = (state, ownProps) => {
  // TODO: shorten method names by removing 'get' and 'Search'?
  const sel = ownProps.selectors || boundSelectors;
  return {
    // TODO: get visible queryText from the stagedSearch?
    queryText: sel.getVisibleQueryText(state),
    stagedSearch: sel.getStagedQuery(state),
    results: sel.getSearchResults(state),
    facets: sel.searchFacets(state),
    activeFilters: sel.stagedFilters(state),
    executionTime: sel.getSearchExecutionTime(state),
    total: sel.getSearchTotal(state),
    totalPages: sel.getSearchTotalPages(state),
    page: sel.getPage(state),
    isSearchPending: sel.isSearchPending(state),
    isSearchComplete: sel.isSearchComplete(state),
    error: sel.getSearchError(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => {
  let myActions = ownProps.actions || actions;
  return bindActionCreators(
    {
      runSearch: myActions.runSearch,
      handleQueryTextChange: myActions.setQueryText,
      changePage: myActions.changePage,
      addFilter: myActions.addFilter,
      removeFilter: myActions.removeFilter,
      replaceFilter: myActions.replaceFilter,
      clearFilter: myActions.clearFilter
    },
    dispatch
  );
};

SearchContainer = connect(mapStateToProps, mapDispatchToProps)(SearchContainer);

export default SearchContainer;
