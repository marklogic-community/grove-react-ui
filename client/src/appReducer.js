import { combineReducers } from 'redux';
import search from 'ml-search-redux';

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

export default combineReducers({search});
