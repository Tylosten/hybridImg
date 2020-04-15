import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import history from '../store/history';
import { store } from '../store';
import GridDisplay from './GridDisplay';
import GridsDiplay from './GridsDisplay';
import HybridsDisplay from './HybridsDisplay';
import Navigation from './Navigation';
import HybridDetails from './HybridDetails';

export function App() {
  return (
    <Router history={history}>
      <Provider store={store}>
        <Navigation />
        <Route
          exact
          path="/home"
          render={() => <GridDisplay edit={true} gridId="G1" />}
        ></Route>
        <Route exact path="/grids" render={() => <GridsDiplay />}></Route>
        <Route exact path="/images" render={() => <HybridsDisplay />}></Route>
        <Route
          exact
          path="/hybrid/:id"
          render={({ match }) => <HybridDetails match={match} />}
        ></Route>
      </Provider>
    </Router>
  );
}
