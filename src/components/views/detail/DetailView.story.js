/* global module */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import DetailView from './DetailView';

let detail = {
  label: 'sample.json',
  address: '588 Pierrepont Street, Inkerman, Michigan, 1536',
  age: 65,
  balance: '$93,416.31',
  company: 'PIGZART',
  favoriteFruit: 'banana'
};

storiesOf('DetailView', module).add('default', () => (
  <DetailView
    detail={detail}
    contentType="application/json"
    loadDetail={action('loadDetail')}
    uri="sample.json"
  />
));
