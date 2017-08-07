import React, { Component } from 'react';
import { Grid, Navbar, Row, Col } from 'react-bootstrap';

// From ml-search-ng ml-input template
        // <form className="form-inline" role="search">
					// <div className="form-group">
						// <input ng-model="qtext" type="text" className="form-control" placeholder="Search..." autocomplete="off"
								// uib-typeahead="suggestion for suggestion in suggest({ val: $viewValue })" typeahead-loading="loadingSuggestions"/>
					// </div>
					// <button type="submit" className="btn btn-default" ng-click="search({ qtext: qtext })">
						// <span className="glyphicon glyphicon-search"></span>
					// </button>
					// <button type="reset" className="btn btn-default" ng-show="qtext" ng-click="clear()">
						// <span className="glyphicon glyphicon-remove"></span>
					// </button>
					// <span ng-show="loadingSuggestions" className="glyphicon glyphicon-refresh"></span>
				// </form>

import { FormGroup, FormControl, InputGroup, Glyphicon, Button } from 'react-bootstrap';
class MLSearchBar extends Component {
  render() {
    return (
      <div className="ml-web-search-bar">
        <form role="search">
          <FormGroup controlId="searchBox">
            <InputGroup>
              <FormControl type="text" placeholder="Search..."/>
              <InputGroup.Button type="submit">
                <Button>
                  <Glyphicon glyph="search"/> Search
                </Button>
                <Button>
                  <Glyphicon glyph="remove"/> Clear
                </Button>
              </InputGroup.Button>
            </InputGroup>
            <Glyphicon glyph="refresh"/>
          </FormGroup>
				</form>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Grid>
            <Navbar.Header>
              <Navbar.Brand>
                <a href="/">MarkLogic Redwood</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
          </Grid>
        </Navbar>
        <Grid>
          <Row>
            <Col md={3}/>
            <Col md={9}>
              <MLSearchBar />
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}

export default App;
