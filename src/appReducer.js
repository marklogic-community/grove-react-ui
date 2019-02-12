import { coreAppReducer } from 'grove-core-react-redux-containers';

export default coreAppReducer;

// The code above is a convenience, for the simple case where you are only
// using Redux modules from grove-core-react-redux-containers. If you need to
// mount additional Redux modules, you should copy the coreAppReducer code from
// grove-core-react-redux-containers and add additional reducers to the first
// argument to `combineReducers()`. The current version of that code is
// included below for your convenience - but note that the core implementation
// may have changed in the meantime, and may change in future upgrades. If you
// copy-and-modify this code, you should check this file for changes between
// upgrades.
//
// Note that you may need to add the following dependencies to your app:

//     npm install --save @marklogic-community/grove-crud-redux \
//       @marklogic-community/grove-search-redux \
//       @marklogic-community/grove-user-redux

// import { combineReducers } from 'redux';
// import search from 'grove-search-redux';
// import documents from 'grove-crud-redux';
// import user, { actionTypes } from 'grove-user-redux';

// const coreAppReducer = (state, action) => {
//   // empty out state on logout, so we don't leak info
//   if (action.type === actionTypes.LOCAL_LOGOUT) {
//     state = undefined;
//   }

//   return combineReducers({ search, documents, user })(state, action);
// };

// export default coreAppReducer;
