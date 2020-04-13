# MarkLogic Search Implemented in Redux

This is a Redux implementation of search. It forms part of the MarkLogic Grove project. It works well for search against MarkLogic, but any backend search system could be used, so long as a middle-tier marshalled the response into the shape specified by the [Grove Core API](https://github.com/marklogic-community/grove-core-api). 

## Use

This Redux module was architected to be consumed by the [`<SearchContainer>`](../containers/SearchContainer.js).  Actions and selectors exposed by this module should also be passed along to this container so the module may be connected to the consuming React components.


### Actions

- `runSearch(query)`. Runs a search based on the passed query. The query will most often be obtained by calling `selectors.getStagedQuery(state)`.
- `setQueryText(queryText)`. This sets a queryText filter in the staged search query.
- `addFilter(constraintName, constraintType, values, optional)`. This will by default append filter values with the given constraintName and a mode of 'and' in the staged search query. You can alternatively append to filter values with a mode of 'or' by passing `{boolean: 'or'}` as part of the `optional` argument. Note that values can be a single value or an array of values.
- `replaceFilter(constraintName, constraintType, values, optional)`: This will by default add or replace filter values with the given constraintName and a mode of 'and' in the staged search query. You can alternatively replace those with a mode of 'or' by passing `{boolean: 'or'}` as part of the `optional` argument. Note that values can be a single value or an array of values.
- `removeFilter(constraintName, values, optional)`. This will by default remove filter values with the given constraintName and a mode of 'and' in the staged search query. You can alternatively remove filter values with a mode of 'or' by passing `{boolean: 'or'}` as part of the `optional` argument. Note that values can be a single value or an array of values.
- `clearFilter(constraintName)`. This clears all filters for a given constraintName in the staged search query.
- `changePage(pageNumber)`. Changes the page in the staged search query.

### Selectors

- Selectors getting information about the **staged** search:
  - `getStagedQuery(state)`. Returns the currently staged query, as serialized in this Redux module and POSTed to a Grove middle-tier.
  - `stagedFilters(state)`. Returns all currently staged filters, as serialized in this Redux module and POSTed to a Grove middle-tier.
  - And more, see [`/reducers/stagedSearch.js`](./reducers/stagedSearch.js).
- Selectors getting information about the **executed** search:
  - `getPage(state)`. Returns the page of the executed search query.
  - `getPageLength(state)`. Returns the page length of the executed search query.
  - And more, see [`./reducers/executedSearch.js`](./reducers/executedSearch.js.)


## 'Ducks' architecture

This roughly follows [the architecture laid out in the re-ducks proposal]( https://github.com/alexnm/re-ducks/blob/f28ecc59d43542b8353948ede0cd3a059ca177dd/README.md):

Specifically, the actionCreators and selectors are the primary external UI. State and reducers should be an implementation detail.