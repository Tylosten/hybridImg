import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'components/App';
import StateApi from 'state-api';

import '../styles/index.scss';

const store = new StateApi(window.__R_DATA.initialData);

ReactDOM.hydrate(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root')
);
