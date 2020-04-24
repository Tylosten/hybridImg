import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { App } from 'components/App';
import initStore from 'store';

import '../styles/index.scss';

const store = initStore(window.__R_DATA.initialData);

ReactDOM.hydrate(
  <BrowserRouter>
    <App store={store} />
  </BrowserRouter>,
  document.getElementById('root')
);
