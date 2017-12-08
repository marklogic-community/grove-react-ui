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
  const sel = ownProps.selectors;
  return {
    detail: sel.documentByUri(state, ownProps.uri)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  loadDetail: ownProps.actions.fetchDoc
}, dispatch);

MLDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLDetailContainer);

export default MLDetailContainer;
