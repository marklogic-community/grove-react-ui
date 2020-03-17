/* eslint-env jest */
import reducer, { selectors } from './reducers';
import * as types from './actionTypes';

// Various states described in test-helpers
import {
  initialState,
  userCreatedSearchState,
  pendingExecutedState,
  mockResults,
  finishedExecutedState,
  failedState
} from './test-helpers';

describe('search reducer', () => {
  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toMatchObject(initialState);
  });

  describe('SEARCH_FAILURE', () => {
    it('adds error and removes pending state', () => {
      expect(
        reducer(pendingExecutedState, {
          type: types.SEARCH_FAILURE,
          payload: { error: 'An error' }
        })
      ).toMatchObject(failedState);
    });

    it('eliminates race conditions');
  });

  describe('SET_QUERYTEXT', () => {
    it('works', () => {
      const expectedState = {
        ...initialState,
        stagedSearch: {
          ...initialState.stagedSearch,
          queryText: 'new queryText'
        }
      };
      expect(
        reducer(initialState, {
          type: types.SET_QUERYTEXT,
          payload: { queryText: 'new queryText' }
        })
      ).toMatchObject(expectedState);
    });
  });

  describe('CHANGE_PAGE', () => {
    it('works', () => {
      expect(
        reducer(finishedExecutedState, {
          type: types.CHANGE_PAGE,
          payload: { page: 3 }
        })
      ).toMatchObject({
        ...finishedExecutedState,
        stagedSearch: {
          ...finishedExecutedState.stagedSearch,
          page: 3
        }
      });
    });
  });

  describe('getSearchResults', () => {
    it('works', () => {
      expect(selectors.getSearchResults(finishedExecutedState)).toEqual(
        mockResults
      );
    });
  });

  describe('getSearchTotal', () => {
    it('works', () => {
      expect(selectors.getSearchTotal(finishedExecutedState)).toEqual(101);
    });
  });

  describe('getSearchError', () => {
    it('works', () => {
      expect(selectors.getSearchError(finishedExecutedState)).toEqual(
        undefined
      );
      expect(selectors.getSearchError(failedState)).toEqual('An error');
    });
  });

  describe('getSearchExecutionTime', () => {
    it('works', () => {
      expect(selectors.getSearchExecutionTime(finishedExecutedState)).toEqual(
        0.00198
      );
    });
  });

  describe('getSearchTotalPages', () => {
    it('works', () => {
      expect(selectors.getSearchTotalPages(finishedExecutedState)).toEqual(11);
    });
  });

  describe('getPage', () => {
    it('works', () => {
      expect(selectors.getPage(finishedExecutedState)).toEqual(1);
    });
  });

  describe('getPageLength', () => {
    it('works', () => {
      expect(selectors.getPageLength(finishedExecutedState)).toEqual(10);
    });
  });

  // TODO: make these work by sending in actions instead of asserting on state
  // shape. It might be even better to test actions and selectors together,
  // using the one to assert on the other, leaving state shape as an untested
  // implementation detail.

  describe('getExecutedSearch', () => {
    it('works', () => {
      expect(selectors.getExecutedSearch(finishedExecutedState)).toEqual(
        finishedExecutedState.executedSearch
      );
    });
  });

  describe('getExecutedSearchQuery', () => {
    it('works', () => {
      expect(selectors.getExecutedSearchQuery(finishedExecutedState)).toEqual(
        finishedExecutedState.executedSearch.query
      );
    });
  });

  describe('getExecutedSearchQueryText', () => {
    it('works', () => {
      expect(
        selectors.getExecutedSearchQueryText(finishedExecutedState)
      ).toEqual(finishedExecutedState.executedSearch.query.queryText);
    });
  });

  describe('isSearchPending', () => {
    it('works when pending', () => {
      expect(selectors.isSearchPending(pendingExecutedState)).toEqual(true);
    });

    it('works when finished', () => {
      expect(selectors.isSearchPending(finishedExecutedState)).toEqual(false);
    });
  });

  describe('getStagedQuery', () => {
    it('works', () => {
      expect(selectors.getStagedQuery(userCreatedSearchState)).toEqual({
        queryText: 'queryText',
        page: 1,
        pageLength: 10
      });
    });
  });

  describe('getVisibleQueryText', () => {
    it('works', () => {
      expect(selectors.getVisibleQueryText(userCreatedSearchState)).toEqual(
        'queryText'
      );
    });
  });
});
