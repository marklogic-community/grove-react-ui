import React from 'react';

const MLSearchSnippet = (props) => {
  const match = props.match;
  const matchSpans = match['match-text'].map( (text, index) => {
    return (
      <em className={text.highlight ? 'mark' : ''} key={index}>
        {text.highlight || text}
      </em>
    );
  });

  return (
    <div className="ml-search-result-match">
      {matchSpans}
    </div>
  );
};

export default MLSearchSnippet;
