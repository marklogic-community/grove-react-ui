import * as types from './actionTypes';

const initialState = {
  suggestPending: false,
  optionsPending: false,
  // TODO? Separate out queryReducer?
  qtext: '',
  suggestQtext: '',
  executedSearch: {
    pending: false,
    id: null, // TODO: Eliminate race conditions
    //  TODO: getSearchStatus
    results: [],
    facets: {},
    error: undefined,
    query: {
      qtext: '',
      page: 1,
      pageLength: 10,
      constraints: {},  // (activeFacets)
    }
  },
  options: {},
  suggestions: []
};

const emptyResponse = {
  results: [],
  facets: {},
};

export default (state = initialState, action) => {
  switch (action.type) {
  // case types.QTEXT:
  //   return {
  //     ...state,
  //     qtext: action.payload
  //   };

  // case types.PAGINATE:
  //   return {
  //     ...state,
  //     page: action.payload
  //   };

  // case types.PAGE_LENGTH:
  //   return {
  //     ...state,
  //     pageLength: action.payload
  //   };

  // case types.CONSTRAINT_ADD: {
  //   let c = action.payload;
  //   let constraints = {...state.constraints};
  //   let constraint = constraints[c.name] =  {...constraints[c.name]};
  //   constraint.values = [...(constraint.values || []), c.value];

  //   return {
  //     ...state,
  //     constraints
  //   };
  // }

  // case types.CONSTRAINT_REMOVE: {
  //   let c = action.payload;
  //   let constraints = {...state.constraints};
  //   let constraint = constraints[c.name] = {...constraints[c.name]};
  //   if (constraint && constraint.values) {
  //     constraint.values = constraint.values.filter(x => x !== c.value);
  //   }

  //   return {
  //     ...state,
  //     constraints
  //   };
  // }

  // case types.SUGGEST_REQUESTED:
  //   return {
  //     ...state,
  //     suggestPending: true,
  //     suggestQtext: action.payload || ''
  //   };

  // case types.SUGGEST_SUCCESS:
  //   return {
  //     ...state,
  //     suggestPending: false,
  //     // suggestQtext: '',
  //     suggestions: action.payload.suggestions || []
  //   };

  // case types.SUGGEST_FAILURE:
  //   return {
  //     ...state,
  //     // TODO: put error somewhere
  //     suggestPending: false,
  //     // suggestQtext: '',
  //     suggestions: []
  //   };

  case types.SEARCH_REQUESTED:
    return {
      ...state,
      executedSearch: {
        // TODO: re-initialize results and facets each time
        ...state.executedSearch,
        pending: true,
        id: Math.random().toString().substr(2, 10),
        query: {
          ...state.executedSearch.query,
          // TODO: nest qtext within payload object, so it is extensible
          qtext: action.payload && action.payload.qtext || ''
        }
      },
    };

  case types.SEARCH_SUCCESS: {
    const response = action.payload || emptyResponse;
    return {
      ...state,
      executedSearch: {
        ...state.executedSearch,
        pending: false,
        results: response.results,
        facets: response.facets
      },
      // suggestQtext: '',
    };
  }

  case types.SEARCH_FAILURE:
    return {
      ...state,
      executedSearch: {
        ...state.executedSearch,
        ...emptyResponse,
        pending: false,
        error: action.payload && action.payload.error
      }
      // suggestQtext: '',
    };

  // case types.OPTIONS_REQUESTED:
  //   return {
  //     ...state,
  //     optionsPending: true
  //   };

  // case types.OPTIONS_SUCCESS: {
  //   let opts = action.payload.options;
  //   let constraints = {};
  //   opts.constraint.forEach(c => constraints[c.name] = c);
  //   return {
  //     ...state,
  //     optionsPending: false,
  //     // TODO: merge values?
  //     constraints: constraints,
  //     options: opts
  //   };
  // }

  // case types.OPTIONS_FAILURE:
  //   return {
  //     ...state,
  //     // TODO: put error somewhere
  //     optionsPending: false,
  //     options: {}
  //   };

  default:
    return state;
  }
};

export const searchSelectors = {
  getSearchResults: state => state.search.executedSearch.results,
  getConstraints: state => state.search.executedSearch.query.constraints,
  getPage: state => state.search.executedSearch.query.page,
  getPageLength: state => state.search.executedSearch.query.pageLength,
  getExecutedSearchQtext: state => state.search.executedSearch.query.qtext,
};
