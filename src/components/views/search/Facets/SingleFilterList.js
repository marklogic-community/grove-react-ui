import React from 'react';
import PropTypes from 'prop-types';

const SingleFilterList = ({
  values,
  selectedValues,
  addFilter,
  removeFilter
}) => (
  <div>
    {selectedValues && (
      <div className="selectedFilterValues">
        {values.map(
          value =>
            selectedValues.includes(value.name) && (
              <div key={value.name}>
                {removeFilter && (
                  <span
                    className={
                      'glyphicon glyphicon-remove-circle icon-white ml-facet-remove-filter'
                    }
                    onClick={removeFilter.bind(null, value.name)}
                    style={{ cursor: 'pointer' }}
                  />
                )}
                <span title={value.name}> {value.value}</span>
                <span> ({value.count})</span>
              </div>
            )
        )}
      </div>
    )}
    <div className="nonSelectedFilterValues">
      {values.map(
        value =>
          (!selectedValues || !selectedValues.includes(value.name)) && (
            <div key={value.name}>
              <i
                className="glyphicon glyphicon-plus-sign ml-facet-add-pos"
                onClick={addFilter.bind(null, value.name)}
                style={{ cursor: 'pointer' }}
              />
              <span title={value.name}> {value.value}</span>
              <span> ({value.count})</span>
              {
                // TODO: negation as an option
                // <i class="fa fa-minus-circle facet-add-neg"
                // ng-if="shouldNegate"
                // ng-click="negate({facet: facet.__key, value: value.value})"
                // title="{{ value.value }}"></i>
              }
              {
                // TODO: show more
                // <div ng-if="shouldShowMore &amp;&amp; !facet.displayingAll">
                //   <a href
                //   ng-click="showMore({facet: facet, facetName: facet.__key})">
                //   see more ...
                //   </a>
                // </div>
              }
            </div>
          )
      )}
    </div>
  </div>
);

SingleFilterList.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      count: PropTypes.number
    })
  ).isRequired,
  selectedValues: PropTypes.array,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func
};

export default SingleFilterList;
