// Public API for the search module
import searchReducer, { searchSelectors } from './reducers';
import * as searchActions from './actions';
export default searchReducer;
export { searchSelectors, searchActions };

// export const suggest = (qtext) => {
//   return (dispatch, getState) => {
//     dispatch({ type: types.SUGGEST_REQUESTED, payload: qtext });

//     let state = getState().search;
//     let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext);

//     return client.suggest(state.suggestQtext, query, { options: 'all' })
//       .then(resp => {
//         if (!resp.ok) throw new Error('bad search');
//         return resp.json();
//       })
//       .then(
//         resp => dispatch({ type: types.SUGGEST_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.SUGGEST_FAILURE, payload: resp }),
//       );
//   };
// };

// export const options = () => {
//   return dispatch => {
//     dispatch({ type: types.OPTIONS_REQUESTED });

//     return client.options('all')
//     // !resp.ok?
//       .then(resp => resp.json())
//       .then(resp => {
//         if (!(resp && resp.options)) throw new TypeError('invalid options');
//         return resp;
//       })
//       .then(
//         resp => dispatch({ type: types.OPTIONS_SUCCESS, payload: resp }),
//         resp => dispatch({ type: types.OPTIONS_FAILURE, payload: resp })
//       );
//   };
// };

// export const qtext = (t) => {
//   return dispatch => {
//     dispatch({ type: types.QTEXT, payload: t });
//     // TODO
//     // return suggest()
//   };
// };

// export const paginate = (n) => {
//   return dispatch => {
//     dispatch({ type: types.PAGINATE, payload: n });
//     return dispatch(runSearch());
//   };
// };

// export const pageLength = (l) => {
//   return dispatch => {
//     dispatch({ type: types.PAGE_LENGTH, payload: l });
//     return dispatch(runSearch());
//   };
// };

// export const addConstraint = (c) => {
//   return dispatch => {
//     dispatch({ type: CONSTRAINT_ADD, payload: c })
//     return dispatch(runSearch())
//   }
// }

// export const rmConstraint = (c) => {
//   return dispatch => {
//     dispatch({ type: CONSTRAINT_REMOVE, payload: c })
//     return dispatch(runSearch())
//   }
// }
