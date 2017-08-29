import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import nock from 'nock';
import { initialState } from './test-helpers';

import * as actions from './actions';
import * as types from './actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('search actions', () => {

  describe('async actions', () => {
    afterEach(() => {
      nock.cleanAll();
    });

    it('creates SEARCH_SUCCESS when search successful', () => {
      nock('http://localhost')
        .post(/search/)
        .reply(200, {
          results: [],
          facets: {}
        });
      const expectedActions = [
        { type: types.SEARCH_REQUESTED, payload: {qtext: 'qtext'} },
        {
          type: types.SEARCH_SUCCESS,
          payload: {
            results: [],
            facets: {},
            // TODO: What else? Maybe where we define the shape of the contract?
          }
        }
      ];
      const store = mockStore({
        search: initialState
      });
      return store.dispatch(actions.runSearch('qtext')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

    it('creates SEARCH_FAILURE when search failed', () => {
      nock('http://localhost')
        .post(/search/)
        .reply(400, {
          errorResponse: {
            statusCode: 400,
            status: 'Bad Request',
            message: 'REST-INVALIDTYPE: (rest:INVALIDTYPE) Invalid type',
            messageCode: 'REST-INVALIDTYPE'
          },
        });
      const expectedActions = [
        { type: types.SEARCH_REQUESTED, payload: {qtext: 'qtext'} },
        {
          type: types.SEARCH_FAILURE,
          payload: {
            error: 'Search error: Bad Request'
          }
        }
      ];
      const store = mockStore({
        search: initialState
      });
      return store.dispatch(actions.runSearch('qtext')).then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
    });

  });

});
