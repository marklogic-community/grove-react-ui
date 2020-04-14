/* global require */
import * as types from '../actionTypes';

require('isomorphic-fetch');

const checkStatus = response => {
  if (response.status >= 200 && response.status < 300) {
    return response;
  } else {
    const error = new Error(response.statusText);
    error.response = response;
    throw error;
  }
};

const defaultAPI = {
  getDoc: id => {
    let contentType;
    return fetch(
      new URL(
        '/api/crud/all/' + encodeURIComponent(id),
        document.baseURI
      ).toString(),
      { credentials: 'same-origin' }
    )
      .then(response => {
        if (!response.ok) throw new Error(response.statusText);
        contentType = response.headers.get('content-type');
        if (contentType && contentType.indexOf('application/json') !== -1) {
          return response.json();
        } else {
          return response.text();
        }
      })
      .then(response => {
        return {
          content: response.content || response,
          contentType: response.contentType || contentType
        };
      });
  },
  createDoc: doc => {
    return fetch(new URL('/api/crud/all/', document.baseURI).toString(), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: doc,
      credentials: 'same-origin'
    })
      .then(checkStatus)
      .then(response => {
        return {
          docId: response.headers.get('location')
        };
      });
  }
};

export const fetchDoc = (docId, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    dispatch({
      type: types.FETCH_DOC_REQUESTED,
      payload: { docId }
    });

    return API.getDoc(docId).then(
      response =>
        dispatch({
          type: types.FETCH_DOC_SUCCESS,
          payload: {
            response,
            docId
          }
        }),
      error => {
        dispatch({
          type: types.FETCH_DOC_FAILURE,
          payload: {
            error: 'Error fetching document: ' + error.message,
            docId
          }
        });
      }
    );
  };
};

export const createDoc = (doc, extraArgs = {}) => {
  const API = extraArgs.api || defaultAPI;
  return dispatch => {
    dispatch({
      type: types.CREATE_DOC_REQUESTED,
      payload: { doc }
    });

    return API.createDoc(doc).then(
      response => {
        dispatch({
          type: types.CREATE_DOC_SUCCESS,
          payload: {
            response,
            doc
          }
        });
      },
      error => {
        dispatch({
          type: types.CREATE_DOC_FAILURE,
          payload: {
            error: 'Error creating document: ' + error.message,
            doc
          }
        });
      }
    );
  };
};
