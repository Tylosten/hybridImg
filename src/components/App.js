import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import { store } from '../store';
import GridDisplay from './GridDisplay';
import GridsDiplay from './GridsDisplay';
import HybridsDisplay from './HybridsDisplay';
import Navigation from './Navigation';
import HybridDetails from './HybridDetails';

export function App() {
  return (
    <Provider store={store}>
      <Navigation />
      <Route exact path="/home" render={() => <div>home</div>}></Route>
      <Route exact path="/grids" render={() => <GridsDiplay />}></Route>
      <Route
        exact
        path="/grid/:id"
        render={({ match }) => <GridDisplay match={match} edit={true} />}
      ></Route>
      <Route exact path="/hybrids" render={() => <HybridsDisplay />}></Route>
      <Route
        exact
        path="/hybrid/:id"
        render={({ match }) => <HybridDetails match={match} />}
      ></Route>
    </Provider>
  );
}
