import React from 'react';
import { Col, FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import './MLSearchBar.css';

const MLSearchBar = (props) => {
  return (
    <Col md={12} className="ml-web-search-bar">
      <form role="search">
        <FormGroup controlId="searchBox">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search..."
              value={props.qtext}
              onChange={props.onQtextChange}
            />
            <InputGroup.Button type="submit">
              <Button onClick={props.onSearchExecute}>
                {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                <Glyphicon glyph="search"/> Search
              </Button>
              <Button onClick={props.onQtextClear}>
                <Glyphicon glyph="remove"/> Clear
              </Button>
            </InputGroup.Button>
          </InputGroup>
        </FormGroup>
      </form>
    </Col>
  );
};

export default MLSearchBar;
