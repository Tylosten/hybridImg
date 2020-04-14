import { createStore } from 'redux';
import defaultState from '../server/defaultState';

export const store = createStore((state, action) => {
  return defaultState;
});
