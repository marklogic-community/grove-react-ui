import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Pagination } from 'react-bootstrap';

import SearchResults from './SearchResults/SearchResults';
import SearchMetrics from './SearchMetrics';

const SearchResponseView = props => {
  return (
    <Row>
      <Col md={12}>
        <Row>
          {props.error ? (
            <Col md={12}>
              <p>
                <strong>There was an error performing your search.</strong>
              </p>
              <p>
                The server sent the following error message:&nbsp;
                <span className="text-danger">{props.error}</span>
              </p>
            </Col>
          ) : (
            !props.isSearchPending && (
              <div>
                <Col md={6}>
                  <SearchMetrics
                    time={props.executionTime}
                    total={props.total}
                  />
                </Col>
                <SearchResults
                  results={props.results || []}
                  detailPath={props.detailPath}
                  resultComponent={props.resultComponent}
                />
                {props.totalPages > 1 && (
                  <Col md={12}>
                    <Pagination
                      items={props.totalPages}
                      maxButtons={10}
                      boundaryLinks={true}
                      activePage={props.page}
                      onSelect={props.handlePageSelection}
                    />
                  </Col>
                )}
              </div>
            )
          )}
        </Row>
      </Col>
    </Row>
  );
};

SearchResponseView.propTypes = {
  error: PropTypes.string,
  results: PropTypes.array,
  executionTime: PropTypes.number,
  total: PropTypes.number,
  page: PropTypes.number,
  totalPages: PropTypes.number,
  handlePageSelection: PropTypes.func
};

export default SearchResponseView;
