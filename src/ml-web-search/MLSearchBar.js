import React, { Component } from 'react';
import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
import './MLSearchBar.css';

export class MLSearchBar extends Component {
  render() {
    return (
      <div className="ml-web-search-bar">
        <form role="search">
          <FormGroup controlId="searchBox">
            <InputGroup>
              <FormControl type="text" placeholder="Search..."/>
              <InputGroup.Button type="submit">
                <Button>
                  {/* <Glyphicon className="glyphicon-spin" glyph="refresh"/> */}
                  <Glyphicon glyph="search"/> Search
                </Button>
                <Button>
                  <Glyphicon glyph="remove"/> Clear
                </Button>
              </InputGroup.Button>
            </InputGroup>
          </FormGroup>
				</form>
      </div>
    );
  }
}
