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
    expect(selectors.currentUser(store.getState())).toBeUndefined();
    expect(selectors.isCurrentUserAuthenticated(store.getState())).toBeFalsy();
    expect(
      selectors.isAuthenticated(store.getState(), 'muir-user')
    ).toBeFalsy();
  });

  // TODO: create a simple login to mirror simple logout
  // TODO: the current completeLogin is more like completeNetworkLogin
  // TODO: might also have a completeNetworkLogout,
  // for situations where we get a push fromt he auth system
  it('can complete simple login', () => {
    store.dispatch(actions.completeLogin(user));
    expect(
      selectors.isAuthenticated(store.getState(), 'muir-user')
    ).toBeTruthy();
  });

  it('can set current user', () => {
    store.dispatch(actions.setCurrentUser('muir-user'));
    expect(selectors.currentUser(store.getState())).toEqual('muir-user');
  });

  // TODO: handle errors
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

  it('does local log out', () => {
    store.dispatch(actions.setCurrentUser('muir-user'));
    store.dispatch(actions.completeLogin(user));
    store.dispatch(actions.localLogout('muir-user'));
    expect(selectors.currentUser(store.getState())).toBeUndefined();
    expect(selectors.isCurrentUserAuthenticated(store.getState())).toBeFalsy();
  });

  // TODO: handle errors
  it('does network logout', done => {
    nock('http://localhost')
      .get(/logout/)
      .reply(200);
    store.dispatch(actions.setCurrentUser('muir-user'));
    store.dispatch(actions.completeLogin(user));
    // TODO: pending state
    store.dispatch(actions.submitLogout('muir-user')).then(() => {
      try {
        expect(
          selectors.isAuthenticated(store.getState(), 'muir-user')
        ).toBeFalsy();
        expect(selectors.currentUser(store.getState())).toBeUndefined();
        expect(
          selectors.isCurrentUserAuthenticated(store.getState())
        ).toBeFalsy();
        done();
      } catch (error) {
        done.fail(error);
      }
    });
  });

  it('gets authentication status over the network', done => {
    nock('http://localhost')
      .get(/status/)
      .reply(200, {
        authenticated: true,
        username: 'muir-user'
      });
    store.dispatch(actions.getAuthenticationStatus()).then(() => {
      try {
        expect(selectors.currentUser(store.getState())).toEqual('muir-user');
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
