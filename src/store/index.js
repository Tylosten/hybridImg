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
      switch (action.type) {
        case mutations.SAVE_HYBRID:
          console.log(action);
          const existingHybrid = hybrids.find(el => el.id === action.hybridId);
          if (existingHybrid) {
            hybrids.splice(hybrids.indexOf(existingHybrid), 1);
            existingHybrid.url = action.url;
            return [...hybrids, existingHybrid];
          }
          return [
            ...hybrids,
            {
              id: action.hybridId,
              author: action.author,
              grid: action.gridId,
              tags: action.tags,
              url: action.url,
            },
          ];
      }
      return hybrids;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (const saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
