import * as types from '../actionTypes';
export default (state = {}, action) => {
  switch (action.type) {
    case types.LOGIN_SUCCESS:
      const username = action.payload.user.username;
      return {
        ...state,
        [username]: {
          ...state[username],
          isAuthenticated: true
        }
      };
    case types.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload.username
      };
    default:
      return state;
  }
};

const currentUser = state => state.currentUser;
const isAuthenticated = (state, user) =>
  state[user] && state[user].isAuthenticated;

const selectors = {
  isAuthenticated: (state, user) => state[user] && state[user].isAuthenticated,
  isCurrentUserAuthenticated: state => {
    const user = currentUser(state);
    return !!user && isAuthenticated(state, user);
  },
  currentUser
};

export { selectors };
