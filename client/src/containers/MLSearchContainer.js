import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MLSearchView } from 'ml-treehouse';

let MLSearchContainer = class MLSearchContainer extends Component {
  render() {
    return (
      <MLSearchView {...this.props} />
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  return {
    results: ownProps.selectors.getSearchResults(state),
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  runSearch: ownProps.runSearch
}, dispatch);

MLSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLSearchContainer);

export default MLSearchContainer;
