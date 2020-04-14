import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import history from '../store/history';
import { store } from '../store';
import ImgGrid from './ImgGrid';
import Navigation from './Navigation';

export function App({ initialData }) {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Navigation />
        <Route
          exact
          path="/mygrid"
          render={() => <ImgGrid edit={true} gridId="G1" />}
        ></Route>
      </Provider>
    </Router>
  );
}
