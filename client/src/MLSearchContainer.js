import React, { Component } from 'react';
import { connect } from 'react-redux';

import { MLSearchView } from 'ml-treehouse';
import { search } from './api/search';
import { receiveSearchResults } from './actions';

let MLSearchContainer = class MLSearchContainer extends Component {
  constructor(props) {
    super(props);
    this.runSearch = this.runSearch.bind(this);
  }

  runSearch(query) {
    // We can inject the search function, at least for tests
    //
    // TODO: Is this designed correctly? Should we have a default function like
    // this?  Should we always inject it?
    const searchFn = this.props.search || search;
    searchFn(query).then(results => {
      this.props.receiveSearchResults(query, results);
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

MLSearchContainer = connect(
  mapStateToProps,
  {receiveSearchResults}
)(MLSearchContainer);

export default MLSearchContainer;
