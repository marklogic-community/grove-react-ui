import React from 'react';
import { Panel, Col } from 'react-bootstrap';
import MLSearchSnippet from './MLSearchSnippet.js';
import './MLSearchResults.css';

const MLSearchResults = (props) => {
  const results = props.results;
  const resultElements = results.map((result => {
    return (
      <Col xs={12} sm={6} md={4} lg={3} className="ml-search-result" key={result.uri}>
        <Panel>
          <h4>{result.label}</h4>
          <div className="ml-search-result-matches">
            {result.matches.map((match, index) => {
              return <MLSearchSnippet match={match} key={index} /> ;
            })}
          </div>
        </Panel>
      </Col>
    );
  }));

  return (
    <div className="ml-search-results">
      { resultElements }
    </div>
  );
};

export default MLSearchResults;
