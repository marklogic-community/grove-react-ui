import * as bareTypes from '../actionTypes';

export const createReducer = config => {
  let types = bareTypes;
  if (config && config.namespace) {
    types = Object.keys(types).reduce((newTypes, typeKey) => {
      newTypes[typeKey] = config.namespace + '/' + types[typeKey];
      return newTypes;
    }, {});
  }
  return (state = {}, action) => {
    switch (action.type) {
      case types.SEARCH_REQUESTED:
        return {
          ...state,
          id: Math.random()
            .toString()
            .substr(2, 10),
          pending: true,
          // response: {
          //   results: [],
          //   // facets: {},
          //   error: undefined
          // },
          query: { ...action.payload.query }
        };
      case types.SEARCH_SUCCESS: {
        const response = action.payload.response;
        let executionTime = response.metrics && response.metrics['total-time'];
        if (executionTime) {
          executionTime = parseFloat(
            executionTime.replace(/^PT/, '').replace(/S$/, '')
          );
        }
        return {
          ...state,
          pending: false,
          response: {
            results: response.results,
            facets: response.facets,
            metadata: {
              executionTime,
              total: response.total
            }
          }
        };
      }
      case types.SEARCH_FAILURE:
        return {
          ...state,
          pending: false,
          response: {
            ...state.response,
            error: action.payload && action.payload.error
          }
        };
      case types.CLEAR_SEARCH_RESULTS:
        return {};
      default:
        return state;
    }
  };
};

// SELECTORS
const getExecutedSearchQuery = state => {
  return state && state.query;
};
const getSearchResponse = state => {
  return state && state.response;
};

// TODO: clean up this clear anti-pattern
const getFromExecutedSearch = (state, propertyName) => {
  return state && state[propertyName];
};
const getFromExecutedSearchQuery = (state, propertyName) => {
  const query = getExecutedSearchQuery(state);
  return query && query[propertyName];
};
const getFromSearchResponse = (state, propertyName) => {
  const response = getSearchResponse(state);
  return response && response[propertyName];
};
const getFromSearchResponseMetadata = (state, propertyName) => {
  const metadata = getFromSearchResponse(state, 'metadata');
  return metadata && metadata[propertyName];
};

const getSearchTotal = state => getFromSearchResponseMetadata(state, 'total');

const getPageLength = state => getFromExecutedSearchQuery(state, 'pageLength');
const isSearchPending = state =>
  getFromExecutedSearch(state, 'pending') || false;

export const selectors = {
  // Executed search bookkeeping
  getExecutedSearch: state => state,
  getExecutedSearchId: state => state.id,
  isSearchPending: isSearchPending,

  // From executed search query
  getExecutedSearchQuery: getExecutedSearchQuery,
  getPage: state => getFromExecutedSearchQuery(state, 'page'),
  getPageLength: getPageLength,
  getExecutedSearchQueryText: state =>
    getFromExecutedSearchQuery(state, 'queryText'),

  // From search response
  // getSearchResponse: getSearchResponse,
  getSearchResults: state => getFromSearchResponse(state, 'results') || [],
  searchFacets: state => getFromSearchResponse(state, 'facets'),
  getSearchTotal: getSearchTotal,
  getSearchExecutionTime: state =>
    getFromSearchResponseMetadata(state, 'executionTime'),
  getSearchError: state => getFromSearchResponse(state, 'error'),

  // Calculated
  getSearchTotalPages: state =>
    Math.ceil(getSearchTotal(state) / getPageLength(state)),
  // TODO: test
  isSearchComplete: state => state.response && !isSearchPending(state)
};
