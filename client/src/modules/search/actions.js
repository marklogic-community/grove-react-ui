import * as types from './actionTypes';
import { selectors } from './reducer';

// TODO: extract this dependency into a separate search api module
import MLRest from 'ml-rest.js';
import qb from 'ml-query-builder.js';

// TODO: extract into search api module
function constraintQuery (constraints) {
  return qb.and(Object.keys(constraints).map(
    name => constraints[name]
  ).filter(
    constraint => constraint.values && constraint.values.length
  ).map(
    constraint => {
      return builder(constraint.name, constraintType(constraint))(constraint.values);
    }
  ));
}

// TODO: extract into search api module
const client = MLRest.create();

// TODO: extract into search api module
let names = ['value', 'word', 'custom', 'collection', 'range'];

// TODO: extract into search api module
function asArray () {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 1) {
    if (args[0] == null) return [];
    if (Array.isArray(args[0])) return args[0];
  }

  return args;
}

// TODO: extract into search api module
function builder (name, type) {
  var builder;

  switch (type) {
  case 'range':
    builder = qb.ext.rangeConstraint;
    break;
  case 'value':
    builder = qb.ext.valueConstraint;
    break;
  case 'word':
    builder = qb.ext.wordConstraint;
    break;
  case 'collection':
    builder = qb.ext.collectionConstraint;
    break;
  case 'custom':
    builder = qb.ext.customConstraint;
    break;
  default:
    throw new TypeError('unknown constraint type: ' + type);
  }

  return function (values) {
    return builder(name, asArray(values));
  };
}

// TODO: extract into search api module
function constraintType (c) {
  let name = !c ? null : Object.keys(c)
    .filter(x =>  x !== 'name' && x !== '_value')[0];

  if (!name) throw new TypeError('bad arg: not a constraint');

  // if (name === 'custom' && c.annotation && c.annotation.length) {
  //   // TODO: filter annotations?
  //   if (geospatialNames.indexOf(constraintName(c.annotation[0])) > -1) {
  //     return 'custom-geospatial'
  //   }
  // }

  if (names.indexOf(name) > -1) return name;
  // if (geospatialNames.indexOf(name) > -1) return 'geospatial'

  throw new TypeError('unknown constraint type: ' + name);
}

export const runSearch = (qtext) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.SEARCH_REQUESTED,
      payload: {qtext}
    });

    let state = getState();
    let params = {
      start: 1 + (selectors.getPage(state) - 1) * selectors.getPageLength(state),
      pageLength: selectors.getPageLength(state),
      options: 'treehouse-options' // TODO: put into store
      // TODO: transform
    };
    let query = qb.ext.combined(
      constraintQuery(selectors.getConstraints(state)),
      selectors.getExecutedSearchQtext(state)
    );
    return client.search(query, params).then(resp => {
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

