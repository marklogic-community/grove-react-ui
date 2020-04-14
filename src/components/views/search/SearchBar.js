import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  FormControl,
  InputGroup,
  Glyphicon,
  Button
} from 'react-bootstrap';

const SearchBar = ({
  queryText,
  onQueryTextChange,
  onSearchExecute,
  placeholder = 'Search...',
  searchPending
}) => {
  return (
    <Col md={12} className="ml-search-bar">
      <form
        role="search"
        onSubmit={e => {
          e.preventDefault();
          onSearchExecute();
        }}
      >
        <FormGroup controlId="searchBox">
          <InputGroup>
            <FormControl
              className="ml-qtext-input"
              type="text"
              placeholder={placeholder}
              value={queryText}
              onChange={e => onQueryTextChange(e.target.value)}
            />
            <InputGroup.Button>
              <Button
                className="ml-execute-search btn-raised"
                disabled={searchPending}
                type="submit"
              >
                {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                <Glyphicon glyph="search" /> Search
              </Button>
              <Button
                onClick={() => onQueryTextChange('')}
                className="ml-qtext-clear btn-raised"
              >
                <Glyphicon glyph="remove" /> Clear
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </Col>
  );
};

SearchBar.propTypes = {
  queryText: PropTypes.string.isRequired,
  onQueryTextChange: PropTypes.func,
  onQueryTextClear: PropTypes.func,
  onSearchExecute: PropTypes.func,
  placeholder: PropTypes.string,
  searchPending: PropTypes.bool
};

export default SearchBar;
