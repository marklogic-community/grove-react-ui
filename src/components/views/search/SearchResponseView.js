import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { Pagination } from '../../Pagination';

import SearchResults from './SearchResults/SearchResults';
import SearchMetrics from './SearchMetrics';

const SearchResponseView = props => {
  return (
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
          //TODO: not sure why i need to specify width here
          <div style={{width:'100%'}}>
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
