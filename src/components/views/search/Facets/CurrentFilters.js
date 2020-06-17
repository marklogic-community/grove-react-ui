import React from 'react';
import PropTypes from 'prop-types';

import TransitionGroup from 'react-transition-group/TransitionGroup';
import Fade from '../../../animations/Fade';

import { some } from 'lodash';

// TODO: truncate values with a truncateLength option
const CurrentFilters = ({ filters, removeFilter }) => (
  <TransitionGroup className="chiclets" appear={true}>
    {filters.map(filter => {
      if (
        some(
          filter.value,
          value => !(typeof value === 'string' || typeof value === 'number')
        )
      ) {
        return null;
      }
      return (
        // <div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}">
        <Fade key={filter.constraint}>
          <div
            style={{ marginBottom: '10px' }}
            className="grove-current-filter"
          >
            {filter.value.map(value => (
              <div
                key={filter.constraint + value}
                className="btn btn-primary btn-raised"
                onClick={removeFilter.bind(null, filter.constraint, value)}
              >
                <span title={value}>
                  {filter.constraint}: {value}{' '}
                </span>
                <i className="fa fa-times-circle-o"></i>
              </div>
            ))}
          </div>
        </Fade>
      );
    })}
  </TransitionGroup>
);

CurrentFilters.propTypes = {
  filters: PropTypes.array.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default CurrentFilters;
