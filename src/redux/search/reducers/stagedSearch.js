import { combineReducers } from 'redux';
import * as bareTypes from '../actionTypes';
import { some, isEqual } from 'lodash';

export const createReducer = config => {
  let types = bareTypes;
  if (config && config.namespace) {
    types = Object.keys(types).reduce((newTypes, typeKey) => {
      newTypes[typeKey] = config.namespace + '/' + types[typeKey];
      return newTypes;
    }, {});
  }

  const queryText = (state = '', action) => {
    switch (action.type) {
      case types.SET_QUERYTEXT:
        return action.payload.queryText;
      default:
        return state;
    }
  };

  const page = (state = 1, action) => {
    switch (action.type) {
      case types.CHANGE_PAGE:
        return action.payload.page;
      default:
        return state;
    }
  };

  const pageLength = (state = 10) => {
    return state;
  };

  // For now at least, always 'and' together filters
  const filters = (state = [], action) => {
    let constraint;
    let boolean;
    switch (action.type) {
      case types.FILTER_REPLACE:
      case types.FILTER_ADD: {
        constraint = action.payload.constraint;
        let constraintType = action.payload.constraintType;
        if (constraintType && constraintType.substring(0, 3) === 'xs:') {
          constraintType = 'range';
        }
        boolean = action.payload.boolean;
        const existingFilter = state.find(
          filter => filter.constraint === constraint && filter.mode === boolean
        );
        if (existingFilter) {
          return state.map(filter => {
            if (filter === existingFilter) {
              return {
                ...filter,
                value: [
                  ...(action.type === types.FILTER_REPLACE ? [] : filter.value),
                  ...action.payload.values
                ]
              };
            } else {
              return filter;
            }
          });
        } else {
          return [
            ...state,
            {
              constraint,
              constraintType,
              mode: boolean,
              type: 'selection',
              value: [...action.payload.values]
            }
          ];
        }
      }
      case types.FILTER_REMOVE: {
        constraint = action.payload.constraint;
        boolean = action.payload.boolean;
        return state.reduce((newState, searchFilter) => {
          if (
            searchFilter.constraint === constraint &&
            searchFilter.mode === boolean
          ) {
            const remainingValues = searchFilter.value.filter(
              v => !some(action.payload.values, value => isEqual(v, value))
            );
            if (remainingValues.length === 0) {
              // remove the entry from state altogether
              return newState;
            } else {
              return [
                ...newState,
                {
                  ...searchFilter,
                  value: remainingValues
                }
              ];
            }
          } else {
            return [...newState, searchFilter];
          }
        }, []);
      }
      case types.FILTER_CLEAR: {
        return state.filter(c => c.constraint !== action.payload.constraint);
      }
      default:
        return state;
    }
  };

  return combineReducers({
    queryText,
    page,
    pageLength,
    filters
  });
};

// SELECTORS
export const selectors = {
  getStagedQuery: state => state,
  getVisibleQueryText: state => state.queryText,
  stagedFilters: state => state.filters
};
