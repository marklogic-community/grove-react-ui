import reducer, { selectors } from './reducer';
import * as types from './actionTypes';

import deepFreeze from 'deep-freeze';

describe('search reducer', () => {

  // TODO: should there be a separate dirtySearch with separate constraints?
  // TODO: should the search options name be part of the Redux store?

  const initialState = {
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

  const initialPendingState = {
    ...initialState,
    executedSearch: {
      ...initialState.executedSearch,
      id: 'pendingID',
      pending: true
    }
  };
  deepFreeze(initialPendingState);

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual( initialState );
  });

  describe('SEARCH_REQUESTED', () => {
    const pendingState = {
      ...initialState,
      executedSearch: {
        ...initialState.executedSearch,
        pending: true,
        id: expect.anything()
      }
    };
    deepFreeze(pendingState);

    it('gives executedSearch an id and pending state', () => {
      expect(
        reducer(initialState, {
          type: types.SEARCH_REQUESTED
        })
      ).toEqual( pendingState );
    });

    const expectedStateWithQtext = {
      ...pendingState,
      executedSearch: {
        ...pendingState.executedSearch,
        query: {
          ...pendingState.executedSearch.query,
          qtext: 'qtext'
        }
      }
    };

    it('sets qtext', () => {
      expect(
        reducer(initialState, {
          type: types.SEARCH_REQUESTED,
          payload: 'qtext'
        })
      ).toEqual(expectedStateWithQtext);
    });

    it('resets executedSearch', () => {
      const newInitialState = {
        ...initialState,
        executedSearch: {
          ...initialState.executedSearch,
          id: 'earlierSearchId',
          query: {
            ...initialState.executedSearch.query,
            qtext: 'earlier search qtext'
          }
        }
      };

      expect(
        reducer(newInitialState, {
          type: types.SEARCH_REQUESTED,
          payload: 'qtext'
        })
      ).toEqual(expectedStateWithQtext);
    });
  });

  describe('SEARCH_SUCCESS', () => {

    it('updates executedSearch with results, facets, and turns off pending', () => {
      const mockResponse = {
        results: [{
          uri: '1.json',
          label: 'Label',
          matches: []
        }],
        facets: {
          Category: {type: 'xs:string', facetValues: []}
        }
      };
      const expectedState = {
        ...initialPendingState,
        executedSearch: {
          ...initialPendingState.executedSearch,
          pending: false,
          ...mockResponse
        }
      };
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_SUCCESS,
          payload: {
            ...mockResponse,
            id: 'pendingID',
          },
        })
      ).toEqual(expectedState);
    });

    it('eliminates race conditions');

  });

  describe('SEARCH_FAILURE', () => {

    it('adds error and removes pending state', () => {
      const expectedState = {
        ...initialPendingState,
        executedSearch: {
          ...initialPendingState.executedSearch,
          pending: false,
          error: 'An error'
        }
      };
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_FAILURE,
          payload: { error: 'An error' }
        })
      ).toEqual(expectedState);
    });

    it('eliminates race conditions');

  });

  describe('getSearchResults', () => {
    it('works', () => {
      const results = [{
        uri: '1.json',
        label: 'Label',
        matches: []
      }];
      const mockState = {
        search: {
          ...initialState,
          executedSearch: {
            ...initialState.executedSearch,
            results: results
          }
        }
      };
      expect(selectors.getSearchResults(mockState)).toEqual(results);
    });
  });

  describe('getConstraints', () => {
    it('works', () => {
      const constraints = [
        {
          Products: 'Hammer'
        }
      ];
      const mockState = {
        search: {
          ...initialState,
          executedSearch: {
            ...initialState.executedSearch,
            query: {
              ...initialState.executedSearch.query,
              constraints: constraints
            }
          }
        }
      };
      expect(selectors.getConstraints(mockState)).toEqual(constraints);
    });
  });

  describe('getPage', () => {
    it('works', () => {
      expect(selectors.getPage({search: initialState})).toEqual(1);
    });
  });

  describe('getPageLength', () => {
    it('works', () => {
      expect(selectors.getPageLength({search: initialState})).toEqual(10);
    });
  });

});
