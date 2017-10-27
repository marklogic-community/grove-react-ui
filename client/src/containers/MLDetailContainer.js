import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MLDetailView } from 'ml-treehouse-react';

let MLDetailContainer = class MLDetailContainer extends Component {
  render() {
    return (
      <div>
        <MLDetailView {...this.props} />
      </div>  
    );
  }
};

const mapStateToProps = (state, ownProps) => {
  // TODO: shorten method names by removing 'get' and 'Search'?
  const sel = ownProps.selectors;
  return {
    // TODO: get visible qtext from the stagedSearch?
    getError: sel.getError(state),
    isDetailPending: sel.isDetailPending(state),
    isDetailComplete: sel.isDetailComplete(state),
    detail: sel.getDetail(state)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  loadDetail: ownProps.actions.loadDetail
}, dispatch);

MLDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLDetailContainer);

export default MLDetailContainer;
