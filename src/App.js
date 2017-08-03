import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';

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

class SearchBar extends Component {
  render() {
    return (
      <div className="ml-web-search-bar">
        <form className="form-inline" role="search">
					<div className="form-group">
						<input type="text" className="form-control" placeholder="Search..."/>
					</div>
					<button type="submit" className="btn btn-default">
						<span className="glyphicon glyphicon-search">Search</span>
					</button>
					<button type="reset" className="btn btn-default">
						<span className="glyphicon glyphicon-remove">Clear</span>
					</button>
					<span className="glyphicon glyphicon-refresh"></span>
				</form>
      </div>
    )
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <SearchBar />
      </div>
    );
  }
}

export default App;
