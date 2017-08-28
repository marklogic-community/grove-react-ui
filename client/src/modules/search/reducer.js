import * as types from './actionTypes';

const initialResponse = {
  results: [],
  facets: {},
  error: undefined
};

const initialState = {
  searchPending: false,
  suggestPending: false,
  optionsPending: false,
  page: 1,
  pageLength: 10,
  qtext: '',
  suggestQtext: '',
  response: initialResponse,
  options: {},
  constraints: {},  // (activeFacets)
  suggestions: []
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
      searchPending: true,
      qtext: action.payload || ''
    };

  case types.SEARCH_SUCCESS:
    return {
      ...state,
      searchPending: false,
      // suggestQtext: '',
      response: action.payload || initialResponse
    };

  case types.SEARCH_FAILURE:
    return {
      ...state,
      // TODO: put error somewhere
      searchPending: false,
      suggestQtext: '',
      response: {
        ...initialResponse,
        error: action.payload && action.payload.error
      }
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
