/* global module */
'use strict';

var MLRest = require('ml-rest.js');
var qb = require('ml-query-builder.js');

const client = MLRest.create();

let names = ['value', 'word', 'custom', 'collection', 'range'];

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

function search(queryObject) {
  // TODO: validate queryObject
  var params = {
    start: 1 + (queryObject.page - 1) * queryObject.pageLength,
    pageLength: queryObject.pageLength,
    options: queryObject.searchProfileName
    // TODO: transform
  };
  var query = qb.ext.combined(
    constraintQuery(queryObject.constraints),
    queryObject.qtext
  );
  return client.search(query, params);
}

module.exports = {
  search: search
};
