import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';

import SearchBar from './SearchBar';
import Facets from './Facets/Facets';
import SearchResponseView from './SearchResponseView';
import Fade from '../../animations/Fade';

class SearchView extends Component {
  constructor(props) {
    super(props);

    this.handleQueryTextChange = this.handleQueryTextChange.bind(this);
    this.handlePageSelection = this.handlePageSelection.bind(this);
    this.search = this.search.bind(this);
  }

  // TODO: probably should pull out the value within the SearchBar
  handleQueryTextChange(value) {
    this.props.handleQueryTextChange(value);
  }

  handlePageSelection(pageNumber) {
    if (pageNumber !== this.props.page) {
      this.props.changePage(pageNumber);
    }
  }

  componentDidUpdate(prevProps) {
    if (
      // Intentionally using != to test object reference (ie, is it the
      // same object?) Because our Redux flow will swap out the filters
      // object on any change, but keep it referentially the same otherwise
      // eslint-disable-next-line
      prevProps.stagedSearch.filters != this.props.stagedSearch.filters
    ) {
      this.search();
    }
    if (prevProps.stagedSearch.page !== this.props.stagedSearch.page) {
      // TODO: DRY up with this.search()?
      this.props.runSearch(this.props.stagedSearch);
    }
  }

  search() {
    if (this.props.stagedSearch.page === 1) {
      this.props.runSearch(this.props.stagedSearch);
    } else {
      this.props.changePage(1);
    }
  }

  render() {
    return (
      <Row>
        <Col md={3}>
          <Facets
            availableFilters={this.props.facets}
            activeFilters={this.props.activeFilters}
            addFilter={this.props.addFilter}
            removeFilter={this.props.removeFilter}
          />
        </Col>
        <Col md={9}>
          <Row>
            <SearchBar
              queryText={this.props.queryText}
              onQueryTextChange={this.handleQueryTextChange}
              onSearchExecute={this.search}
            />
          </Row>
          {this.props.isSearchComplete || this.props.isSearchPending ? (
            <Fade in={this.props.isSearchComplete} appear={true}>
              <SearchResponseView
                error={this.props.error}
                results={this.props.results}
                executionTime={this.props.executionTime}
                total={this.props.total}
                page={this.props.page}
                totalPages={this.props.totalPages}
                handlePageSelection={this.handlePageSelection}
                detailPath={this.props.detailPath}
                resultComponent={this.props.resultComponent}
                isSearchPending={this.props.isSearchPending}
              />
            </Fade>
          ) : (
            <p>Please click Search to find results.</p>
          )}
        </Col>
      </Row>
    );
  }
}

SearchView.propTypes = {
  // TODO: flesh out which are required
  // TODO: group together some of these, perhaps back to what is returned from
  // selectors, like stagedSearch and searchResponse
  stagedSearch: PropTypes.object.isRequired,
  queryText: PropTypes.string.isRequired,
  handleQueryTextChange: PropTypes.func.isRequired,
  runSearch: PropTypes.func.isRequired,
  error: PropTypes.string,
  results: PropTypes.array, // TODO: say more about shape of this
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  isSearchComplete: PropTypes.bool,
  isSearchPending: PropTypes.bool,
  changePage: PropTypes.func,
  detailPath: PropTypes.string,

  // TODO: rename facets => availableFilters?
  facets: PropTypes.object,
  activeFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default SearchView;
