import React from 'react';
import { connect } from 'react-redux';

import CreateView from '../components/views/create/CreateView';

import { bindActionCreators } from 'redux';

import { actions, selectors } from '../redux/crud';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

let CreateContainer = class CreateContainer extends React.Component {
  render() {
    return <CreateView {...this.props} />;
  }
};

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  return {
    ...ownProps,
    error: sel.creationError(state),
    pending: sel.isCreatePending(state),
    docId: sel.createdDocId(state)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      onCreateExecute: actions.createDoc
    },
    dispatch
  );

CreateContainer = connect(mapStateToProps, mapDispatchToProps)(CreateContainer);

export default CreateContainer;
