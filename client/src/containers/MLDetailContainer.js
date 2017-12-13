import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MLDetailView } from 'ml-treehouse-react';

const mapStateToProps = (state, ownProps) => {
  const sel = ownProps.selectors;
  return {
    detail: sel.documentByUri(state, ownProps.uri),
    contentType: sel.contentTypeByUri(state, ownProps.uri)
  };
};

const mapDispatchToProps = (dispatch, ownProps) => bindActionCreators({
  loadDetail: ownProps.actions.fetchDoc
}, dispatch);

const MLDetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLDetailView);

export default MLDetailContainer;
