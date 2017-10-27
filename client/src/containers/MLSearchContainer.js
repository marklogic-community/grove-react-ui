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
  const sel = ownProps.selectors;
  return {
    // TODO: get visible qtext from the stagedSearch?
    qtext: sel.getVisibleQtext(state),
    stagedSearch: sel.getStagedQuery(state),
    results: sel.getSearchResults(state),
    executionTime: sel.getSearchExecutionTime(state),
    total: sel.getSearchTotal(state),
    totalPages: sel.getSearchTotalPages(state),
    page: sel.getPage(state),
    isSearchPending: sel.isSearchPending(state),
    isSearchComplete: sel.isSearchComplete(state),
    getError: sel.getError(state),
    isDetailPending: sel.isDetailPending(state),
    isDetailComplete: sel.isDetailComplete(state),
    detail: sel.getDetail(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  runSearch: ownProps.actions.runSearch,
  handleQtextChange: ownProps.actions.setQtext,
  changePage: ownProps.actions.changePage,
  loadDetail: ownProps.actions.loadDetail
}, dispatch);

MLSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLSearchContainer);

export default MLSearchContainer;
