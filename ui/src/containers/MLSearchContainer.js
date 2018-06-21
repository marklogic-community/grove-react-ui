import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { SearchView } from 'muir-react';

import { actions, selectors } from 'muir-search-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'search');

let MLSearchContainer = class MLSearchContainer extends Component {
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
    activeConstraints: sel.stagedConstraints(state),
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
      addConstraint: myActions.addConstraint,
      removeConstraint: myActions.removeConstraint
    },
    dispatch
  );
};

MLSearchContainer = connect(mapStateToProps, mapDispatchToProps)(
  MLSearchContainer
);

export default MLSearchContainer;
