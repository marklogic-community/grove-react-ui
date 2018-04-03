import * as types from './actionTypes';

export const completeLogin = user => ({
  type: types.LOGIN_SUCCESS,
  payload: { user }
});
require('isomorphic-fetch');

const defaultAPI = {
  login: (username, password) => {
    return fetch(new URL('/api/user/login', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify({ username, password })
    });
  }
};

export const setCurrentUser = username => ({
  type: types.SET_CURRENT_USER,
  payload: { username }
});

export const submitLogin = (username, password, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    // TODO: pending state
    // dispatch({
    //   type:
    // })
    return API.login(username, password).then(response => {
      if (response.ok) {
        dispatch(setCurrentUser(username))
        dispatch(completeLogin({ username }));
      }
    });
  };
};
