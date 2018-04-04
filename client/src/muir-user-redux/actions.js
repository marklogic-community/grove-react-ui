import * as types from './actionTypes';

require('isomorphic-fetch');

export const completeLogin = user => ({
  type: types.NETWORK_LOGIN_SUCCESS,
  payload: { user }
});

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
  },
  logout: username => {
    return fetch(new URL('/api/user/logout', document.baseURI).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(
      response => {
        return response;
      },
      error => {
        console.log('error:', error);
        throw error;
      }
    );
  },
  status: () => {
    return fetch(new URL('/api/user/status', document.baseURI).toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin'
    }).then(
      response => {
        if (!response.ok) {
          return response.json().then(error => {
            throw new Error(error.message);
          });
        }
        return response.json()
      },
      error => {
        console.log('error:', error);
        throw error;
      }
    );
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
        dispatch(setCurrentUser(username));
        dispatch(completeLogin({ username }));
      }
    });
  };
};

export const completeNetworkLogout = username => ({
  type: types.NETWORK_LOGOUT_SUCCESS,
  payload: { username }
});

export const submitLogout = (username, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    dispatch(localLogout());
    // TODO: pending state
    // dispatch({
    //   type:
    // })
    return API.logout(username).then(response => {
      if (response.ok) {
        dispatch(completeNetworkLogout(username));
      }
    });
  };
};

export const localLogout = () => ({
  type: types.LOCAL_LOGOUT
});

export const getAuthenticationStatus = (extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    // TODO: pending state
    // dispatch({
    //   type:
    // })
    return API.status().then(response => {
      dispatch({
        type: types.FETCH_AUTHSTATUS_SUCCESS,
        payload: { user: response }
      });
    });
  };
};
