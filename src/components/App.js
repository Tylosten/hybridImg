import React from 'react';
import { Route } from 'react-router-dom';

import StoreContext from './StoreContext';
import GridDisplay from './GridDisplay';
import GridsDiplay from './GridsDisplay';
import HybridsDisplay from './HybridsDisplay';
import Navigation from './Navigation';
import HybridDetails from './HybridDetails';

export const App = props => {
  return (
    <StoreContext.Provider value={props.store}>
      <Navigation />
      <Route exact path="/home" render={() => <div></div>}></Route>
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
    </StoreContext.Provider>
  );
};
