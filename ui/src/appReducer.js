import { combineReducers } from 'redux';
import search from 'muir-search-redux';
import documents from 'ml-documents-redux';
import user, { actionTypes } from 'muir-user-redux';

const appReducer = combineReducers({ search, documents, user });

export default (state, action) => {
  // empty out state on logout, so we don't leak info
  if (action.type === actionTypes.LOCAL_LOGOUT) {
    state = undefined;
  }

  return appReducer(state, action);
};
