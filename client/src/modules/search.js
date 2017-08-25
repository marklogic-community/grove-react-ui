import MLRest from 'ml-rest.js'
import qb from 'ml-query-builder.js'

const client = MLRest.create()

export const QTEXT = 'search/QTEXT'
export const PAGINATE = 'search/PAGINATE'
export const PAGE_LENGTH = 'search/PAGE_LENGTH'
export const CONSTRAINT_ADD = 'search/CONSTRAINT_ADD'
export const CONSTRAINT_REMOVE = 'search/CONSTRAINT_REMOVE'
export const SUGGEST_REQUESTED = 'search/SUGGEST_REQUESTED'
export const SUGGEST_SUCCESS = 'search/SUGGEST_SUCCESS'
export const SUGGEST_FAILURE = 'search/SUGGEST_FAILURE'
export const SEARCH_REQUESTED = 'search/SEARCH_REQUESTED'
export const SEARCH_SUCCESS = 'search/SEARCH_SUCCESS'
export const SEARCH_FAILURE = 'search/SEARCH_FAILURE'


export const OPTIONS_REQUESTED = 'search/OPTIONS_REQUESTED'
export const OPTIONS_SUCCESS = 'search/OPTIONS_SUCCESS'
export const OPTIONS_FAILURE = 'search/OPTIONS_FAILURE'

const initialState = {
  searchPending: false,
  suggestPending: false,
  optionsPending: false,
  page: 1,
  pageLength: 10,
  qtext: '',
  suggestQtext: '',
  response: { results: [], facets: {} },
  options: {},
  constraints: {},  // (activeFacets)
  suggestions: []
}

let names = ['value', 'word', 'custom', 'collection', 'range']

function constraintType (c) {
  let name = !c ? null : Object.keys(c)
    .filter(x =>  x !== 'name' && x !== '_value')[0]

  if (!name) throw new TypeError('bad arg: not a constraint')

  // if (name === 'custom' && c.annotation && c.annotation.length) {
  //   // TODO: filter annotations?
  //   if (geospatialNames.indexOf(constraintName(c.annotation[0])) > -1) {
  //     return 'custom-geospatial'
  //   }
  // }

  if (names.indexOf(name) > -1) return name
  // if (geospatialNames.indexOf(name) > -1) return 'geospatial'

  throw new TypeError('unknown constraint type: ' + name)
}

function asArray () {
  var args = Array.prototype.slice.call(arguments)

  if (args.length === 1) {
    if (args[0] == null) return []
    if (Array.isArray(args[0])) return args[0]
  }

  return args
}

function builder (name, type) {
  var builder

  switch (type) {
    case 'range':
      builder = qb.ext.rangeConstraint
      break
    case 'value':
      builder = qb.ext.valueConstraint
      break
    case 'word':
      builder = qb.ext.wordConstraint
      break
    case 'collection':
      builder = qb.ext.collectionConstraint
      break
    case 'custom':
      builder = qb.ext.customConstraint
      break
    default:
      throw new TypeError('unknown constraint type: ' + type)
  }

  return function (values) {
    return builder(name, asArray(values))
  }
}

function constraintQuery (constraints) {
  return qb.and(Object.keys(constraints)
  .map(name => constraints[name])
  .filter(constraint => constraint.values && constraint.values.length)
  .map(constraint => {
    return builder(constraint.name, constraintType(constraint))(constraint.values)
  }))
}

export const search = (qtext) => {
  return (dispatch, getState) => {
    console.log('searching')
    dispatch({ type: SEARCH_REQUESTED, payload: qtext })

    let state = getState().search
    let params = {
      start: 1 + (state.page - 1) * state.pageLength,
      pageLength: state.pageLength,
      options: 'all'
      // TODO: transform
    }
    let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext)
    console.log(query)
    return client.search(query, params)
    .then(resp => {
      if (!resp.ok) throw new Error('bad search')
      return resp.json()
    })
    .then(
      resp => dispatch({ type: SEARCH_SUCCESS, payload: resp }),
      resp => dispatch({ type: SEARCH_FAILURE, payload: resp }),
    )
  }
}

export const suggest = (qtext) => {
  return (dispatch, getState) => {
    dispatch({ type: SUGGEST_REQUESTED, payload: qtext })

    let state = getState().search
    let query = qb.ext.combined(constraintQuery(state.constraints), state.qtext)

    return client.suggest(state.suggestQtext, query, { options: 'all' })
    .then(resp => {
      if (!resp.ok) throw new Error('bad search')
      return resp.json()
    })
    .then(
      resp => dispatch({ type: SUGGEST_SUCCESS, payload: resp }),
      resp => dispatch({ type: SUGGEST_FAILURE, payload: resp }),
    )
  }
}

export const options = () => {
  return dispatch => {
    dispatch({ type: OPTIONS_REQUESTED })

    return client.options('all')
    // !resp.ok?
    .then(resp => resp.json())
    .then(resp => {
      if (!(resp && resp.options)) throw new TypeError('invalid options')
      return resp
    })
    .then(
      resp => dispatch({ type: OPTIONS_SUCCESS, payload: resp }),
      resp => dispatch({ type: OPTIONS_FAILURE, payload: resp }),
    )
  }
}

export const qtext = (t) => {
  return dispatch => {
    dispatch({ type: QTEXT, payload: t })
    // TODO
    // return suggest()
  }
}

export const paginate = (n) => {
  return dispatch => {
    dispatch({ type: PAGINATE, payload: n })
    return dispatch(search())
  }
}

export const pageLength = (l) => {
  return dispatch => {
    dispatch({ type: PAGE_LENGTH, payload: l })
    return dispatch(search())
  }
}

export const addConstraint = (c) => {
  return dispatch => {
    dispatch({ type: CONSTRAINT_ADD, payload: c })
    return dispatch(search())
  }
}

export const rmConstraint = (c) => {
  return dispatch => {
    dispatch({ type: CONSTRAINT_REMOVE, payload: c })
    return dispatch(search())
  }
}


export default (state = initialState, action) => {
  switch (action.type) {
    case QTEXT:
      return {
        ...state,
        qtext: action.payload
      }

    case PAGINATE:
      return {
        ...state,
        page: action.payload
      }

    case PAGE_LENGTH:
      return {
        ...state,
        pageLength: action.payload
      }

    case CONSTRAINT_ADD: {
      let c = action.payload
      let constraints = {...state.constraints}
      let constraint = constraints[c.name] =  {...constraints[c.name]}
      constraint.values = [...(constraint.values || []), c.value]

      return {
        ...state,
        constraints
      }
    }

    case CONSTRAINT_REMOVE: {
      let c = action.payload
      let constraints = {...state.constraints}
      let constraint = constraints[c.name] = {...constraints[c.name]}
      if (constraint && constraint.values) {
        constraint.values = constraint.values.filter(x => x !== c.value)
      }

      return {
        ...state,
        constraints
      }
    }

    case SUGGEST_REQUESTED:
      return {
        ...state,
        suggestPending: true,
        suggestQtext: action.payload || ''
      }

    case SUGGEST_SUCCESS:
      return {
        ...state,
        suggestPending: false,
        // suggestQtext: '',
        suggestions: action.payload.suggestions || []
      }

    case SUGGEST_FAILURE:
      return {
        ...state,
        // TODO: put error somewhere
        suggestPending: false,
        // suggestQtext: '',
        suggestions: []
      }

    case SEARCH_REQUESTED:
      return {
        ...state,
        searchPending: true,
        qtext: action.payload || ''
      }

    case SEARCH_SUCCESS:
      return {
        ...state,
        searchPending: false,
        suggestQtext: '',
        response: action.payload
      }

    case SEARCH_FAILURE:
      return {
        ...state,
        // TODO: put error somewhere
        searchPending: false,
        suggestQtext: '',
        response: {}
      }

    case OPTIONS_REQUESTED:
      return {
        ...state,
        optionsPending: true
      }

    case OPTIONS_SUCCESS:
      let opts = action.payload.options
      let constraints = {}
      opts.constraint.forEach(c => constraints[c.name] = c)
      return {
        ...state,
        optionsPending: false,
        // TODO: merge values?
        constraints: constraints,
        options: opts
      }

    case OPTIONS_FAILURE:
      return {
        ...state,
        // TODO: put error somewhere
        optionsPending: false,
        options: {}
      }

    default:
      return state
  }
}
