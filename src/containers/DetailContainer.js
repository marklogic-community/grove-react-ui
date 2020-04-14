import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import DetailView from '../components/views/detail/DetailView';

import { actions, selectors } from '../redux/crud';
import { bindSelectors } from '../utils/redux-utils';
const boundSelectors = bindSelectors(selectors, 'documents');

const mapStateToProps = (state, ownProps) => {
  const sel = boundSelectors;
  const detail = sel.documentById(state, ownProps.id);
  return {
    // TODO: move this label implementation to a samplePerson branch
    // because it is not generic, but it is useful for a quick Grove demo
    label: detail && detail.name,
    detail: detail,
    error: sel.errorById(state, ownProps.id),
    contentType: sel.contentTypeById(state, ownProps.id)
  };
};

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      loadDetail: actions.fetchDoc
    },
    dispatch
  );

const DetailContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(DetailView);

export default DetailContainer;
