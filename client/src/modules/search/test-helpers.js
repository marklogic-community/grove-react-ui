import deepFreeze from 'deep-freeze';

// TODO: should there be a separate dirtySearch with separate constraints?
// TODO: should the search options name be part of the Redux store?
export const initialState = {
  suggestPending: false,
  optionsPending: false,
  // TODO? Separate out queryReducer?
  qtext: '',
  suggestQtext: '',
  executedSearch: {
    id: null, // TODO: Eliminate race conditions
    //  TODO: getSearchStatus
    pending: false,
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
deepFreeze(initialState);
