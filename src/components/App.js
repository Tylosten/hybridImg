import React, { useReducer } from 'react';
import { Route } from 'react-router-dom';

import {
  StoreContext,
  StoreReducer,
  StoreMiddleware,
} from '../store/StoreReducer';

import Login from './Login';
import GridDisplay from './GridDisplay';
import GridsDiplay from './GridsDisplay';
import HybridsDisplay from './HybridsDisplay';
import Navigation from './Navigation';
import HybridDetails from './HybridDetails';

export const App = props => {
  const [store, dispatchToStore] = useReducer(StoreReducer, props.store);

  return (
    <StoreContext.Provider value={[store, StoreMiddleware(dispatchToStore)]}>
      <Navigation />
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/home">
        <></>
      </Route>
      <Route exact path="/grids" component={GridsDiplay}></Route>
      <Route exact path="/grid/:id" component={GridDisplay}></Route>
      <Route exact path="/hybrids" component={HybridsDisplay}></Route>
      <Route exact path="/hybrid/:id" component={HybridDetails}></Route>
    </StoreContext.Provider>
  );
};
