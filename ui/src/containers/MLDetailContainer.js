import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DetailView } from 'muir-react';

import { actions, selectors } from 'ml-documents-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  return {
    detail: sel.documentByUri(state, ownProps.uri),
    error: sel.errorByUri(state, ownProps.uri),
    contentType: sel.contentTypeByUri(state, ownProps.uri)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadDetail: actions.fetchDoc
    },
    dispatch
  );

const MLDetailContainer = connect(mapStateToProps, mapDispatchToProps)(
  DetailView
);

export default MLDetailContainer;
