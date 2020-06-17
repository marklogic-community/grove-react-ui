import React from 'react';
import PropTypes from 'prop-types';
import {
  Col,
  FormGroup,
  FormControl,
  InputGroup,
  ButtonGroup,
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
            <ButtonGroup style={{ padding: '4.5px 12px', margin: 0 }}>
              <Button
                className="ml-execute-search btn-raised"
                disabled={searchPending}
                type="submit"
              >
                {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                <i className="fa fa-search"></i> Search
              </Button>
              <Button
                onClick={() => onQueryTextChange('')}
                className="ml-qtext-clear btn-raised"
              >
                <i className="fa fa-times"></i> Clear
              </Button>
            </ButtonGroup>
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
