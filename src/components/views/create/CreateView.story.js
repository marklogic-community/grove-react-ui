/* global module, Promise */
import React from 'react';
import { storiesOf } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';
import { action } from '@storybook/addon-actions';

import CreateView from './CreateView';

storiesOf('CreateView', module).add('default', () => (
  <BrowserRouter>
    <CreateView
      redirectPath="/detail"
      onCreateExecute={(...args) =>
        Promise.resolve(action('onCreateExecute')(...args))
      }
    />
  </BrowserRouter>
));
