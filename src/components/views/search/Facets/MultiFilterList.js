import React from 'react';
import PropTypes from 'prop-types';

import without from 'lodash/without';

const initialState = {
  valuesToAdd: [],
  valuesToRemove: []
};

class MultiFilterList extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
    this.applyChanges = this.applyChanges.bind(this);
    this.handleNonSelectedCheckChange = this.handleNonSelectedCheckChange.bind(
      this
    );
    this.handleSelectedCheckChange = this.handleSelectedCheckChange.bind(this);
  }

  handleSelectedCheckChange(value) {
    if (this.state.valuesToRemove.includes(value)) {
      this.setState({
        valuesToRemove: without(this.state.valuesToRemove, value)
      });
    } else {
      this.setState({
        valuesToRemove: [...this.state.valuesToRemove, value]
      });
    }
  }

  handleNonSelectedCheckChange(value) {
    if (this.state.valuesToAdd.includes(value)) {
      this.setState({
        valuesToAdd: without(this.state.valuesToAdd, value)
      });
    } else {
      this.setState({
        valuesToAdd: [...this.state.valuesToAdd, value]
      });
    }
  }

  applyChanges() {
    // TODO: add {boolean: 'or'} ?
    this.state.valuesToAdd.forEach(value => this.props.addFilter(value));
    this.state.valuesToRemove.forEach(value => this.props.removeFilter(value));
    this.setState(initialState);
  }

  render() {
    return (
      <div>
        {this.props.selectedValues && (
          <div className="selectedFilterValues">
            {this.props.values.map(
              value =>
                this.props.selectedValues
                  .map(v => v.value)
                  .includes(value.value) && (
                  <div key={value.value}>
                    <input
                      className="ml-facet-remove-filter"
                      type="checkbox"
                      name={value.value}
                      checked={!this.state.valuesToRemove.includes(value.value)}
                      onChange={this.handleSelectedCheckChange.bind(
                        null,
                        value.value
                      )}
                    />
                    <span title={value.value}> {value.value}</span>
                    <span> ({value.count})</span>
                  </div>
                )
            )}
          </div>
        )}
        <div className="nonSelectedFilterValues">
          {this.props.values.map(
            value =>
              (!this.props.selectedValues ||
                !this.props.selectedValues
                  .map(v => v.value)
                  .includes(value.value)) && (
                <div className="nonSelectedFilterValue" key={value.value}>
                  <input
                    className="ml-facet-add-pos"
                    type="checkbox"
                    name={value.value}
                    checked={this.state.valuesToAdd.includes(value.value)}
                    onChange={this.handleNonSelectedCheckChange.bind(
                      null,
                      value.value
                    )}
                  />
                  <span title={value.value}> {value.value}</span>
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
        <button
          className="btn btn-default btn-sm ml-facet-apply"
          disabled={
            this.state.valuesToAdd.length === 0 &&
            this.state.valuesToRemove.length === 0
          }
          onClick={this.applyChanges}
        >
          Apply
        </button>
      </div>
    );
  }
}

MultiFilterList.propTypes = {
  values: PropTypes.arrayOf(
    PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      count: PropTypes.number
    })
  ).isRequired,
  selectedValues: PropTypes.array.isRequired,
  addFilter: PropTypes.func.isRequired,
  removeFilter: PropTypes.func.isRequired
};

export default MultiFilterList;
