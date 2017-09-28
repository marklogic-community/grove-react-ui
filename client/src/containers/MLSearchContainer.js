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
  return {
    qtext: ownProps.selectors.getVisibleQtext(state),
    executedSearch: ownProps.selectors.getExecutedSearch(state)
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
