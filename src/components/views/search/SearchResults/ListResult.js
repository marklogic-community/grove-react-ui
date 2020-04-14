import React from 'react';
import { Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';

const getFilename = id => {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

const ListResult = props => (
  <Col xs={12} className="ml-search-result">
    <h4>
      <Link
        to={{
          pathname: props.detailPath,
          state: { id: props.result.id },
          search: `?id=${props.result.id}`
        }}
      >
        {props.result.label || getFilename(props.result.id) || props.result.uri}
      </Link>
    </h4>
    <div className="ml-search-result-matches">
      {props.result.matches &&
        props.result.matches.map((match, index) => (
          <SearchSnippet match={match} key={index} />
        ))}
    </div>
    <hr />
  </Col>
);

export default ListResult;
