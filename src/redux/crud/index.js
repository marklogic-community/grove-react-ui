// Public API for the documents module
import reducer, { selectors } from './reducers';
import * as actions from './actions';
import * as actionTypes from './actionTypes';

export default reducer;
export { selectors, actions, actionTypes };
