import { combineReducers } from 'redux';
import byId, { selectors as byIdSelectors } from './byId';
import createUpdate, {
  selectors as createUpdateSelectors
} from './createUpdate';

export default combineReducers({ byId, createUpdate });

// SELECTORS
const bindSelector = (selector, mountPoint) => {
  return (state, ...args) => {
    return selector(state[mountPoint], ...args);
  };
};

const bindSelectors = (selectors, mountPoint) => {
  return Object.keys(selectors).reduce((bound, key) => {
    bound[key] = bindSelector(selectors[key], mountPoint);
    return bound;
  }, {});
};

export const selectors = {
  ...bindSelectors(byIdSelectors, 'byId'),
  ...bindSelectors(createUpdateSelectors, 'createUpdate')
};
