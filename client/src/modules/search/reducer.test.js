import reducer from './reducer';
import * as types from './actionTypes';

import deepFreeze from 'deep-freeze';

describe('search reducer', () => {

  const initialState = {
    searchPending: false,
    suggestPending: false,
    optionsPending: false,
    page: 1,
    pageLength: 10,
    qtext: '',
    suggestQtext: '',
    response: { results: [], facets: {} },
    options: {},
    constraints: {},  // (activeFacets)
    suggestions: []
  };
  deepFreeze(initialState);

  const initialPendingState = Object.assign(
    {}, initialState, {searchPending: true}
  );
  deepFreeze(initialPendingState);

  it('returns the initial state', () => {
    expect(reducer(undefined, {})).toEqual( initialState );
  });

  describe('SEARCH_REQUESTED', () => {
    const expectedState = Object.assign(
      {}, initialState, {searchPending: true}
    );
    deepFreeze(expectedState);

    it('sets search pending', () => {
      expect(
        reducer(initialState, {
          type: types.SEARCH_REQUESTED
        })
      ).toEqual(expectedState);
    });

    it('sets qtext', () => {
      const expectedStateWithQtext = Object.assign(
        {}, expectedState, { qtext: 'qtext' }
      );
      expect(
        reducer(initialState, {
          type: types.SEARCH_REQUESTED,
          payload: 'qtext'
        })
      ).toEqual(expectedStateWithQtext);
    });

    it('resets qtext', () => {
      const newInitialState = Object.assign(
        {}, initialState, {qtext: 'initial qtext'}
      );
      expect(
        reducer(newInitialState, {
          type: types.SEARCH_REQUESTED
          // No qtext payload
        })
      ).toEqual(expectedState);
    });
  });

  describe('SEARCH_SUCCESS', () => {

    it('removes pending status from search', () => {
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_SUCCESS
        })
      ).toEqual(initialState);
    });

    it('sets response based on payload', () => {
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
      const expectedState = Object.assign(
        {}, initialState, {response: mockResponse}
      );
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_SUCCESS,
          payload: mockResponse
        })
      ).toEqual(expectedState);
    });

  });

  describe('SEARCH_FAILURE', () => {

    it('removes pending status from search', () => {
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_FAILURE
        })
      ).toEqual(initialState);
    });

    it('adds error', () => {
      const expectedState = Object.assign(
        {}, initialState, {response: {
          error: 'An error',
          results: [],
          facets: {}
        }}
      );
      expect(
        reducer(initialPendingState, {
          type: types.SEARCH_FAILURE,
          payload: { error: 'An error' }
        })
      ).toEqual(expectedState);
    });

  });

});
