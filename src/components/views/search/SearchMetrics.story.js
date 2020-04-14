/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';

import SearchMetrics from './SearchMetrics';

storiesOf('SearchView/SearchResponseView/SearchMetrics', module)
  .add('default', () => <SearchMetrics time={0.090908989} total={1000} />)
  .add('without time', () => <SearchMetrics total={1000} />)
  .add('without total', () => <SearchMetrics time={0.090908989} />)
  .add('with nothing', () => <SearchMetrics />);
