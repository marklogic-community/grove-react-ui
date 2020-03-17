/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SearchBar from './SearchBar';

class SearchBarWithState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      queryText: ''
    };
  }

  render() {
    return (
      <SearchBar
        queryText={this.state.queryText}
        onQueryTextChange={queryText => {
          this.setState({ queryText });
          return action('onQueryTextChange')(queryText);
        }}
        onSearchExecute={action('runSearch')}
      />
    );
  }
}

storiesOf('SearchView/SearchBar', module).add('default', () => (
  <SearchBarWithState />
));
