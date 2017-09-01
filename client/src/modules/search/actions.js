import * as types from './actionTypes';
import { searchSelectors as selectors } from './reducers';
import searchAPI from './api/search';

export const runSearch = (submittedQtext) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: {qtext: submittedQtext}
    });

    let state = getState();
    let qtext = selectors.getExecutedSearchQtext(state);
    let constraints = selectors.getConstraints(state);
    let page = selectors.getPage(state);
    let pageLength = selectors.getPageLength(state);
    let searchProfileName = 'treehouse-options'; // TODO: put in store

    return searchAPI.search({
      qtext,
      constraints,
      page,
      pageLength,
      searchProfileName
    }).then(resp => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    }).then(
      resp => dispatch({ type: types.SEARCH_SUCCESS, payload: resp }),
      error => dispatch({
        type: types.SEARCH_FAILURE,
        payload: {
          error: 'Search error: ' + error.message
        }
      })
    );
  };
};

