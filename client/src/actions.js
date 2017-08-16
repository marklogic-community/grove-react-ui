import { RECEIVE_SEARCH_RESULTS } from './actionTypes';

export const receiveSearchResults = (query, results) => {
  return {
    type: RECEIVE_SEARCH_RESULTS,
    query: query,
    results: results
  };
};

