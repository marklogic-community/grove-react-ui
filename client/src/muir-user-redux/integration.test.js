import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import nock from 'nock';

import reducer, { actions, selectors } from './';

describe('muir-user-redux', () => {
  let store;
  beforeEach(() => {
    store = createStore(reducer, applyMiddleware(thunk));
  });
  afterEach(nock.cleanAll);

  const user = { username: 'muir-user' };

  it('has initial state', () => {
    expect(
      selectors.isAuthenticated(store.getState(), 'muir-user')
    ).toBeFalsy();
    expect(
      selectors.isCurrentUserAuthenticated(store.getState())
    ).toBeFalsy();
  });

  it('can complete simple login', () => {
    store.dispatch(actions.completeLogin(user));
    expect(
      selectors.isAuthenticated(store.getState(), 'muir-user')
    ).toBeTruthy();
  });

  it('can set current user', () => {
    expect(selectors.currentUser(store.getState())).toBeUndefined();
    store.dispatch(actions.setCurrentUser('muir-user'));
    expect(selectors.currentUser(store.getState())).toEqual('muir-user'); });

  it('can request login and launch async authorization', done => {
    nock('http://localhost')
      .post(/login/)
      .reply(200);
    // TODO: test authorization pending
    store.dispatch(actions.submitLogin('muir-user', 'password')).then(() => {
      try {
        expect(
          selectors.isAuthenticated(store.getState(), 'muir-user')
        ).toBeTruthy();
        expect(
          selectors.isCurrentUserAuthenticated(store.getState())
        ).toBeTruthy();
        done();
      } catch (error) {
        done.fail(error);
      }
    });
  });
});
