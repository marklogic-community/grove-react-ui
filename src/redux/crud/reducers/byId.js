import * as types from '../actionTypes';
import X2JS from 'x2js';
let x2js;

// TODO: extract, which may make writing the selectors simpler
const documentReducer = (state = {}, action) => {
  switch (action.type) {
    case types.FETCH_DOC_REQUESTED:
      return {
        ...state,
        pending: true
      };
    case types.FETCH_DOC_SUCCESS:
      return {
        ...state,
        content: action.payload.response.content,
        contentType: action.payload.response.contentType,
        pending: false,
        error: undefined
      };
    case types.FETCH_DOC_FAILURE:
      return {
        ...state,
        pending: false,
        error: action.payload.error
      };
    default:
      return state;
  }
};

export default (state = {}, action) => {
  if (action.payload && action.payload.docId) {
    return {
      ...state,
      [action.payload.docId]: documentReducer(
        state[action.payload.docId],
        action
      )
    };
  }
  return state;
};

// SELECTORS
const xmlToJson = xml => {
  x2js = x2js || new X2JS();
  return x2js.xml2js(xml);
};

const getDocumentById = (state, id) => state[id] && state[id].content;
const getContentTypeById = (state, id) => state[id] && state[id].contentType;

export const selectors = {
  isDocumentFetchPending: (state, docId) =>
    !!(state[docId] && state[docId].pending),
  documentById: getDocumentById,
  jsonById: (state, id) => {
    const content = getDocumentById(state, id);
    if (!content) {
      return;
    }
    if (getContentTypeById(state, id).indexOf('application/xml') !== -1) {
      return xmlToJson(content);
    } else {
      return content;
    }
  },
  contentTypeById: getContentTypeById,
  errorById: (state, id) => state[id] && state[id].error
};
