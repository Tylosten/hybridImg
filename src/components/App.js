import React, { useReducer } from 'react';
import { Route, Redirect } from 'react-router-dom';

import {
  StoreContext,
  StoreReducer,
  StoreMiddleware,
} from '../store/StoreReducer';

import Login from './Login';
import TemplatesDisplay from './TemplatesDisplay';
import TemplateForm from './TemplateForm';
import GridDisplay from './GridDisplay';
import GridsDiplay from './GridsDisplay';
import FilteredHybrids from './FilteredHybrids';
import Navigation from './Navigation';
import HybridDetails from './HybridDetails';
import Home from './Home';
import About from './About';
import GridForm from './GridForm';

export const App = props => {
  const [store, dispatchToStore] = useReducer(StoreReducer, props.store);

  const RouteGuard = (Component, props) => ({ match }) => {
    if (!store.session.authenticated) {
      return <Redirect to="/login" />;
    }
    return <Component match={match} {...props} />;
  };

  return (
    <StoreContext.Provider value={[store, StoreMiddleware(dispatchToStore)]}>
      <Route path="*" component={Navigation} />
      <Route exact path="/login" component={Login}></Route>
      <Route exact path="/" component={About}></Route>
      <Route path="/home/(:subpath)?" component={RouteGuard(Home)}></Route>
      <Route
        exact
        path="/templates"
        component={RouteGuard(TemplatesDisplay, { byLine: 2 })}
      ></Route>
      <Route
        exact
        path="/templates/new"
        component={RouteGuard(TemplateForm)}
      ></Route>
      <Route
        exact
        path="/grids"
        component={RouteGuard(GridsDiplay, { byLine: 2 })}
      ></Route>
      <Route
        path="/grids/new/(:templateId)?"
        component={RouteGuard(GridForm)}
      ></Route>
      <Route exact path="/grid/:id" component={RouteGuard(GridDisplay)}></Route>
      <Route
        exact
        path="/hybrids"
        component={RouteGuard(FilteredHybrids)}
      ></Route>
      <Route
        exact
        path="/hybrid/:id"
        component={RouteGuard(HybridDetails)}
      ></Route>
    </StoreContext.Provider>
  );
};
