/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

import SingleFilterList from './SingleFilterList';
import { defaultValues } from './shared';

storiesOf('SearchView/Facets/SingleFilterList', module)
  .add('default', () => (
    <SingleFilterList values={defaultValues} addFilter={action('addFilter')} />
  ))
  .add('with a selection', () => (
    <SingleFilterList
      values={defaultValues}
      selectedValues={['First']}
      addFilter={action('addFilter')}
      removeFilter={action('removeFilter')}
    />
  ));
