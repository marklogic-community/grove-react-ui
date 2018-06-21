import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { DetailView } from 'muir-react';

import { actions, selectors } from 'muir-crud-redux';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  const detail = sel.documentByUri(state, ownProps.uri)
  return {
    // TODO: move this label implementation to a samplePerson branch
    // because it is not generic, but it is useful for a quick MUIR demo
    label: detail && detail.name,
    detail: detail,
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
