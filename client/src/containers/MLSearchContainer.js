import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { MLSearchView } from 'ml-treehouse';
import { runSearch } from '../modules/search';

let MLSearchContainer = class MLSearchContainer extends Component {

  render() {
    return (
      <MLSearchView {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    // TODO: getter for such things
    results: state.search.response.results,
  };
};

const mapDispatchToProps = dispatch => bindActionCreators({
  runSearch
}, dispatch);

MLSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLSearchContainer);

export default MLSearchContainer;
