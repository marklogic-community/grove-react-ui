import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import SearchSnippet from './SearchSnippet.js';
import './CardResult.css';

const getFilename = id => {
  if (!id) {
    return null;
  }
  return id.split('%2F').pop();
};

const SearchSnippets = ({ result }) => (
  <div className="ml-search-result-matches">
    {result.matches &&
      result.matches.map((match, index) => (
        <SearchSnippet match={match} key={index} />
      ))}
  </div>
);

const Header = props => (
  <h1 className="panel-title">
    {props.result.label || getFilename(props.result.id) || props.result.uri}
  </h1>
);

const CardResult = props => (
  <Col xs={12} sm={6} md={4} lg={3} className="ml-search-result">
    <Link
      to={{
        pathname: props.detailPath,
        state: { id: props.result.id },
        search: `?id=${props.result.id}`
      }}
      style={{ textDecoration: 'none' }}
    >
      <Panel
        bsStyle="info"
        style={{ height: '200px', overflow: 'hidden' }}
        header={props.header && <props.header {...props} />}
      >
        <props.content {...props} />
      </Panel>
    </Link>
  </Col>
);

CardResult.defaultProps = {
  content: SearchSnippets,
  header: Header,
  detailPath: '/detail'
};

CardResult.propTypes = {
  content: PropTypes.func,
  header: PropTypes.func,
  detailPath: PropTypes.string,
  result: PropTypes.shape({
    id: PropTypes.string
  })
};

export default CardResult;
