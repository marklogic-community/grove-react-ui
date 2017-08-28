import MLRest from 'ml-rest.js';
import qb from 'ml-query-builder.js';

import * as types from './search/actionTypes';

// TODO: export reducer
// TODO: export actionCreator

const client = MLRest.create();

let names = ['value', 'word', 'custom', 'collection', 'range'];

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

function asArray () {
  var args = Array.prototype.slice.call(arguments);

  if (args.length === 1) {
    if (args[0] == null) return [];
    if (Array.isArray(args[0])) return args[0];
  }

  return args;
}

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

export const runSearch = (qtext) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SEARCH_REQUESTED, payload: qtext });

    let state = getState().search;
    let params = {
      start: 1 + (state.page - 1) * state.pageLength,
      pageLength: state.pageLength,
      options: 'treehouse-options' // TODO: put into store
      // TODO: transform
    };
    let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext);
    return client.search(query, params).then(resp => {
      if (!resp.ok) throw new Error('bad search');
      return resp.json();
    }).then(
      resp => dispatch({ type: types.SEARCH_SUCCESS, payload: resp }),
      resp => dispatch({ type: types.SEARCH_FAILURE, payload: resp })
    );
  };
};

export const suggest = (qtext) => {
  return (dispatch, getState) => {
    dispatch({ type: types.SUGGEST_REQUESTED, payload: qtext });

    let state = getState().search;
    let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext);

    return client.suggest(state.suggestQtext, query, { options: 'all' })
      .then(resp => {
        if (!resp.ok) throw new Error('bad search');
        return resp.json();
      })
      .then(
        resp => dispatch({ type: types.SUGGEST_SUCCESS, payload: resp }),
        resp => dispatch({ type: types.SUGGEST_FAILURE, payload: resp }),
      );
  };
};

export const options = () => {
  return dispatch => {
    dispatch({ type: types.OPTIONS_REQUESTED });

    return client.options('all')
    // !resp.ok?
      .then(resp => resp.json())
      .then(resp => {
        if (!(resp && resp.options)) throw new TypeError('invalid options');
        return resp;
      })
      .then(
        resp => dispatch({ type: types.OPTIONS_SUCCESS, payload: resp }),
        resp => dispatch({ type: types.OPTIONS_FAILURE, payload: resp })
      );
  };
};

export const qtext = (t) => {
  return dispatch => {
    dispatch({ type: types.QTEXT, payload: t });
    // TODO
    // return suggest()
  };
};

export const paginate = (n) => {
  return dispatch => {
    dispatch({ type: types.PAGINATE, payload: n });
    return dispatch(runSearch());
  };
};

export const pageLength = (l) => {
  return dispatch => {
    dispatch({ type: types.PAGE_LENGTH, payload: l });
    return dispatch(runSearch());
  };
};

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
