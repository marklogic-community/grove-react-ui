// Public API for the search module
import reducer, { createReducer, selectors } from './reducers';
import createActions from './actions';
import * as actionTypes from './actionTypes';

// Lower-level reducers for composition
import {
  createReducer as createExecutedSearchReducer,
  selectors as executedSearchSelectors
} from './reducers/executedSearch';

const actions = createActions();

export default reducer;
export {
  createReducer,
  createActions,
  selectors,
  actions,
  actionTypes,
  createExecutedSearchReducer,
  executedSearchSelectors
};
