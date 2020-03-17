import { combineReducers } from 'redux';
import search from './redux/search';
import documents from './redux/crud';
import user, { actionTypes } from './redux/user';

const appReducer = (state, action) => {
  // empty out state on logout, so we don't leak info
  if (action.type === actionTypes.LOCAL_LOGOUT) {
    state = undefined;
  }

  return combineReducers({ search, documents, user })(state, action);
};

export default appReducer;
