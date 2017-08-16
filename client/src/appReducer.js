import { RECEIVE_SEARCH_RESULTS } from './actionTypes';

// const exampleStore = {
//   search: {
//     query: {
//       qtext: '',
//       constraints: [
//         {
//           active: false
//         },
//         {
//           active: true
//         },
//       ],
//       options: {},
//       savedQueryOptions: 'all',
//       start: 1,
//       pageLength: 10,
//       searchTransform: null
//     },
//     status: 'uninitialized', // 'ready', 'failed' ?? necessary?
//     results: []
//   }
// }

const initialState = {
  search: {
    query: {
      qtext: '',
      constraints: [],
      options: {},
      savedQueryOptions: 'treehouse-options',
      start: 1,
      pageLength: 10,
      searchTransform: null
    },
    // status: 'uninitialized', // 'ready', 'failed' ?? necessary?
    results: []
  }
};

function appReducer(state = initialState, action) {
  switch (action.type) {
  case RECEIVE_SEARCH_RESULTS:
    // This overwrites all of the query object. Problematic?
    // Case for Reducer composition, or just an assignDeep alternative?
    return Object.assign({}, state, {
      search: {
        query: action.query,
        results: action.results
      },
    });
  default:
    return state;
  }
}

export default appReducer;
