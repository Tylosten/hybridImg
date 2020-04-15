import { createStore, applyMiddleware, combineReducers } from 'redux';
import defaultState from '../server/defaultState';
import { createLogger } from 'redux-logger';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();
import * as sagas from './sagas.mock';
import * as mutations from './mutations';

export const store = createStore(
  combineReducers({
    users(users = defaultState.users, action) {
      return users;
    },
    themes(themes = defaultState.themes, action) {
      return themes;
    },
    grids(grids = defaultState.grids, action) {
      return grids;
    },
    hybrids(hybrids = defaultState.hybrids, action) {
      console.log(action);
      switch (action.type) {
        case mutations.CREATE_HYBRID:
          return [
            ...hybrids,
            {
              id: action.id,
              name: action.name,
              grid: action.grid,
              tags: action.tags,
              url: action.url,
              user: action.user,
            },
          ];
        case mutations.SET_HYBRID_NAME:
          return hybrids.map(h => {
            return h.id === action.id ? { ...h, name: action.name } : h;
          });
        case mutations.SET_HYBRID_TAGS:
          return hybrids.map(h => {
            return h.id === action.id ? { ...h, tags: action.tags } : h;
          });
        case mutations.SET_HYBRID_URL:
          return hybrids.map(h => {
            return h.id === action.id ? { ...h, url: action.url } : h;
          });
        case mutations.SET_HYBRID_GRID:
          return hybrids.map(h => {
            return h.id === action.id ? { ...h, grid: action.grid } : h;
          });
      }
      return hybrids;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
