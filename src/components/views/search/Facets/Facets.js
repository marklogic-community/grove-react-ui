import React from 'react';
import PropTypes from 'prop-types';

import CurrentFilters from './CurrentFilters';
import SingleFilterList from './SingleFilterList';

// TODO: truncate names with a truncateLength option
// TODO: handle blank values
const Facets = ({
  activeFilters,
  availableFilters,
  addFilter,
  removeFilter
}) => (
  <div className="ml-facet-list list-group">
    {
      // TODO - this was when facets should be negatible?
      // Example of passing in attribute to change component behavior?
      // <ml-chiclets
      //   ng-if="shouldNegate"
      //   active-facets="activeFacets"
      //   toggle="toggle({facet:facet, value:value})"
      //   truncate="{{ truncateLength }}"></ml-chiclets>
    }
    {activeFilters.length > 0 && (
      <CurrentFilters filters={activeFilters} removeFilter={removeFilter} />
    )}
    {availableFilters &&
      Object.keys(availableFilters)
        .filter(facetName => {
          return availableFilters[facetName].facetValues;
        })
        .map(facetName => {
          let selectedValues;
          const activeFilter = activeFilters.find(
            filter => filter.constraint === facetName
          );
          if (activeFilter) {
            selectedValues = activeFilter.value;
          }
          return (
            <div key={facetName} className="panel panel-primary ml-facet">
              <div className="panel-heading">
                <h3 className="panel-title">{facetName}</h3>
              </div>
              <div className="panel-body">
                <SingleFilterList
                  values={availableFilters[facetName].facetValues}
                  selectedValues={selectedValues}
                  addFilter={addFilter.bind(
                    null,
                    facetName,
                    availableFilters[facetName].type || null
                  )}
                  removeFilter={removeFilter.bind(null, facetName)}
                />
              </div>
            </div>
          );
        })}
  </div>
);

Facets.propTypes = {
  activeFilters: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  availableFilters: PropTypes.object,
  removeFilter: PropTypes.func.isRequired
};

export default Facets;
