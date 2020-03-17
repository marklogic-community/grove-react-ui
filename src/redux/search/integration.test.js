/* eslint-env jest */
import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

import reducer, { actions, selectors } from './index';

import { mockResults, mockFacets, mockSearchResponse } from './test-helpers';

describe('search', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
  });

  describe('page', () => {
    it('is initially undefined, defaults to 1 on search, and changes', () => {
      expect(selectors.getPage(store.getState())).toBeUndefined();
      expect(selectors.getPageLength(store.getState())).toBeUndefined();
      const mockAPI = { search: () => Promise.resolve({}) };
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()), {
          api: mockAPI
        })
      );
      expect(selectors.getPage(store.getState())).toEqual(1);
      expect(selectors.getPageLength(store.getState())).toEqual(10);
      store.dispatch(actions.changePage(3));
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()), {
          api: mockAPI
        })
      );
      expect(selectors.getPage(store.getState())).toEqual(3);
    });
  });

  it('manages filters', () => {
    expect(selectors.stagedFilters(store.getState())).toEqual([]);
    // TODO: validation that it is valid and not duplicate? Where?
    // Probably not duplicate in reducer, right? A NOOP?
    store.dispatch(actions.addFilter('eyeColor', null, 'blue'));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['blue']
      }
    ]);
    store.dispatch(actions.addFilter('eyeColor', null, ['brown', 'red']));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['blue', 'brown', 'red']
      }
    ]);
    store.dispatch(actions.removeFilter('eyeColor', 'brown'));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['blue', 'red']
      }
    ]);
    store.dispatch(actions.addFilter('gender', null, 'female'));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['blue', 'red']
      },
      {
        type: 'selection',
        constraint: 'gender',
        mode: 'and',
        value: ['female']
      }
    ]);
    store.dispatch(actions.removeFilter('eyeColor', ['blue', 'red']));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'gender',
        mode: 'and',
        value: ['female']
      }
    ]);
  });

  it('manages filters with object values', () => {
    const box1 = {
      south: 38,
      north: 42,
      east: 10,
      west: 20
    };
    const box2 = {
      south: -38,
      north: -42,
      east: -10,
      west: -20
    };
    store.dispatch(actions.addFilter('location', 'geospatial', box1));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'location',
        constraintType: 'geospatial',
        mode: 'and',
        value: [box1]
      }
    ]);
    store.dispatch(actions.addFilter('location', null, box2));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'location',
        constraintType: 'geospatial',
        mode: 'and',
        value: [box1, box2]
      }
    ]);
    store.dispatch(actions.removeFilter('location', { ...box1 }));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'location',
        constraintType: 'geospatial',
        mode: 'and',
        value: [box2]
      }
    ]);
  });

  it('clears filters based on constraint', () => {
    store.dispatch(actions.addFilter('eyeColor', null, 'blue'));
    store.dispatch(actions.addFilter('eyeColor', null, 'brown'));
    store.dispatch(actions.clearFilter('eyeColor'));
    expect(selectors.stagedFilters(store.getState())).toEqual([]);
  });

  it('replaces filters based on constraint and mode', () => {
    store.dispatch(actions.addFilter('eyeColor', null, 'blue'));
    store.dispatch(actions.addFilter('eyeColor', null, 'brown'));
    store.dispatch(
      actions.addFilter('eyeColor', null, 'or-color', { boolean: 'or' })
    );
    store.dispatch(actions.replaceFilter('eyeColor', null, ['orange']));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['orange']
      },
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'or',
        value: ['or-color']
      }
    ]);
    store.dispatch(
      actions.replaceFilter('eyeColor', null, ['green', 'red'], {
        boolean: 'or'
      })
    );
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'and',
        value: ['orange']
      },
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'or',
        value: ['green', 'red']
      }
    ]);
  });

  it('manages ORed filters', () => {
    store.dispatch(
      actions.addFilter('eyeColor', null, 'blue', { boolean: 'or' })
    );
    store.dispatch(
      actions.addFilter('eyeColor', null, 'brown', { boolean: 'or' })
    );
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'or',
        value: ['blue', 'brown']
      }
    ]);
    store.dispatch(actions.removeFilter('eyeColor', 'blue', { boolean: 'or' }));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'eyeColor',
        mode: 'or',
        value: ['brown']
      }
    ]);
    store.dispatch(
      actions.removeFilter('eyeColor', 'brown', { boolean: 'or' })
    );
    expect(selectors.stagedFilters(store.getState())).toEqual([]);
  });

  // TODO: deprecate, see GROVE-276; this is a leaky abstraction
  it('passes through constraintType', () => {
    store.dispatch(actions.addFilter('gender', 'collection', 'female'));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'gender',
        constraintType: 'collection',
        mode: 'and',
        value: ['female']
      }
    ]);
    store.dispatch(actions.removeFilter('gender', 'female'));
    store.dispatch(actions.addFilter('gender', 'xs:string', 'female'));
    expect(selectors.stagedFilters(store.getState())).toEqual([
      {
        type: 'selection',
        constraint: 'gender',
        constraintType: 'range',
        mode: 'and',
        value: ['female']
      }
    ]);
  });

  describe('runSearch', () => {
    afterEach(nock.cleanAll);

    it('runs a successful search', done => {
      nock('http://localhost')
        .post('/api/search/all')
        .reply(200, mockSearchResponse);
      expect(selectors.getSearchResults(store.getState())).toEqual([]);
      expect(selectors.isSearchPending(store.getState())).toBe(false);
      const unsubscribe = store.subscribe(() => {
        try {
          expect(selectors.isSearchPending(store.getState())).toBe(true);
          expect(selectors.getSearchResults(store.getState())).toEqual([]);
          // Page defaults
          expect(selectors.getPage(store.getState())).toEqual(1);
          expect(selectors.getPageLength(store.getState())).toEqual(10);
        } catch (error) {
          done.fail(error);
        }
        unsubscribe();
      });
      store
        .dispatch(actions.runSearch(selectors.getStagedQuery(store.getState())))
        .then(() => {
          try {
            expect(nock.isDone()).toBe(true);
            expect(selectors.isSearchPending(store.getState())).toBe(false);
            expect(selectors.getSearchResults(store.getState())).toEqual(
              mockResults
            );
            expect(selectors.searchFacets(store.getState())).toEqual(
              mockFacets
            );
            expect(selectors.getSearchExecutionTime(store.getState())).toEqual(
              0.00198
            );
            expect(selectors.getSearchTotal(store.getState())).toEqual(101);
            expect(selectors.getPage(store.getState())).toEqual(1);
            expect(selectors.getPageLength(store.getState())).toEqual(10);
          } catch (error) {
            done.fail(error);
          }
          done();
        });
    });

    // TODO: this helps to remove flickering when new searches run
    // but it is a little odd logically
    // This might suggest that current results and facets should
    // exist outside the 'executedSearch'
    it('maintains stale results while new search pending', done => {
      nock('http://localhost')
        .persist()
        .post('/api/search/all')
        .reply(200, mockSearchResponse);
      store
        .dispatch(actions.runSearch(selectors.getStagedQuery(store.getState())))
        .then(() => {
          expect(nock.isDone()).toBe(true);
          const unsubscribe = store.subscribe(() => {
            try {
              expect(selectors.isSearchPending(store.getState())).toBe(true);
              expect(selectors.getSearchResults(store.getState())).toEqual(
                mockResults
              );
              done();
            } catch (error) {
              done.fail(error);
            }
            unsubscribe();
          });
        })
        .then(() =>
          store.dispatch(
            actions.runSearch(selectors.getStagedQuery(store.getState()))
          )
        );
    });

    it('responds to queryText changes', done => {
      const mockSearch = jest.fn(() => Promise.resolve({}));
      const mockAPI = { search: mockSearch };
      expect(selectors.getVisibleQueryText(store.getState())).toEqual('');
      store.dispatch(actions.setQueryText('new text'));
      expect(selectors.getVisibleQueryText(store.getState())).toEqual(
        'new text'
      );
      store
        .dispatch(
          actions.runSearch(selectors.getStagedQuery(store.getState()), {
            api: mockAPI
          })
        )
        .then(() => {
          expect(mockSearch).toHaveBeenCalledWith(
            expect.objectContaining({ queryText: 'new text' }),
            expect.anything()
          );
          expect(
            selectors.getExecutedSearchQueryText(store.getState())
          ).toEqual('new text');
          done();
        });
    });

    it('can paginate', done => {
      const mockSearch = jest.fn(() => Promise.resolve({}));
      const mockAPI = { search: mockSearch };
      store.dispatch(actions.changePage(2));
      store
        .dispatch(
          actions.runSearch(selectors.getStagedQuery(store.getState()), {
            api: mockAPI
          })
        )
        .then(() => {
          expect(selectors.getPage(store.getState())).toEqual(2);
          expect(mockSearch).toHaveBeenCalledWith(
            expect.objectContaining({ options: { pageLength: 10, start: 11 } }),
            expect.anything()
          );
          done();
        });
    });

    it('reports error after search failure', done => {
      nock('http://localhost')
        .post('/api/search/all')
        .reply(400, {
          statusCode: 400,
          status: 'Bad Request',
          message: 'REST-INVALIDTYPE: (rest:INVALIDTYPE) Invalid type',
          messageCode: 'REST-INVALIDTYPE'
        });
      expect(selectors.getSearchError(store.getState())).toBeUndefined();
      let isFirstUpdate = true;
      store.subscribe(() => {
        if (isFirstUpdate) {
          expect(selectors.getSearchError(store.getState())).toBeUndefined();
          isFirstUpdate = false;
        } else {
          expect(selectors.getSearchError(store.getState())).toEqual(
            expect.stringContaining('Invalid type')
          );
          done();
        }
      });
      store.dispatch(
        actions.runSearch(selectors.getStagedQuery(store.getState()))
      );
    });

    it('allows search to be cleared', () => {
      store.dispatch(actions.receiveSuccessfulSearch(mockSearchResponse));
      expect(selectors.getSearchResults(store.getState())).toEqual(mockResults);
      store.dispatch(actions.clearSearchResults());
      expect(selectors.getSearchResults(store.getState())).toEqual([]);
      expect(selectors.isSearchPending(store.getState())).toBe(false);
      expect(selectors.getPage(store.getState())).toBeUndefined();
      expect(selectors.getPageLength(store.getState())).toBeUndefined();
      expect(selectors.getSearchError(store.getState())).toBeUndefined();
    });

    // Could have a long-running search error, while a second search succeeds
    // Successful results should be maintained and error should not enter state
    it('only reacts to the latest executedSearch results');

    it('allows for reducer / action namespacing');
  });
});
