import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MLSearchView } from 'ml-treehouse-react';

let MLSearchContainer = class MLSearchContainer extends Component {
  render() {
    return (
      <MLSearchView {...this.props} />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // TODO: shorten method names by removing 'get' and 'Search'?
  return {
    qtext: ownProps.selectors.getVisibleQtext(state),
    results: ownProps.selectors.getSearchResults(state),
    executionTime: ownProps.selectors.getSearchExecutionTime(state),
    total: ownProps.selectors.getSearchTotal(state),
    totalPages: ownProps.selectors.getSearchTotalPages(state),
    page: ownProps.selectors.getPage(state),
    preExecutedSearch: ownProps.selectors.getPreExecutedQuery(state),
    isSearchPending: ownProps.selectors.isSearchPending(state),
    isSearchComplete: ownProps.selectors.isSearchComplete(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  runSearch: ownProps.actions.runSearch,
  handleQtextChange: ownProps.actions.setQtext
}, dispatch);

MLSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLSearchContainer);

export default MLSearchContainer;
