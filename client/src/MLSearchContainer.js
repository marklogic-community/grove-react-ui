import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MLSearchView } from 'ml-treehouse';
import { search } from './api/search';
// import { RECEIVE_SEARCH_RESULTS } from './actionTypes';

// TODO: move to action creator?
// const receiveSearchResults = (query, results) => {
//   return {
//     type: RECEIVE_SEARCH_RESULTS,
//     query: query,
//     results: results
//   };
// };

let MLSearchContainer = class MLSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
  }

  runSearch(query) {
    const searchFn = this.props.search || search;
    searchFn(query).then(results => {
      console.log(results);
    });
  }

  render() {
    return (
      <MLSearchView runSearch={this.runSearch} {...this.props} />
    );
  }
};

const mapStateToProps = (state) => {
  return {
    results: state.results,
  };
};

const mapDispatchToProps = () => {
  return {};
};

MLSearchContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(MLSearchContainer);

export default MLSearchContainer;
