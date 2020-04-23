import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { actionTypes } from './StoreActions';

export const StoreContext = React.createContext();

export const StoreMiddleware = dispatch => {
  return action => {
    switch (action.type) {
      case actionTypes.LOGIN: {
        let session;
        return axios
          .post('/login', {
            username: action.username,
            password: action.password,
          })
          .then(res => {
            session = res.data;
          })
          .catch(err => {
            console.info(err);
            session = { authenticated: false };
          })
          .finally(() => {
            dispatch({ ...action, session });
          });
      }
      case actionTypes.LOGOUT: {
        return axios
          .get('/logout')
          .catch(err => {
            console.info(err);
          })
          .finally(() => {
            dispatch(action);
          });
      }
      case actionTypes.CREATE_HYBRID: {
        const formData = new FormData();
        formData.append('name', action.name);
        formData.append('file', action.file);
        formData.append('tags', action.tags);
        formData.append('grid', action.grid);
        return axios.post('/hybrid/new', formData).then(res => {
          dispatch({ ...action, hybrid: res.data });
        });
      }
      case actionTypes.UPDATE_HYBRID: {
        return axios.post('/hybrid/update', action).then(() => {
          dispatch(action);
        });
      }
      case actionTypes.DELETE_HYBRID: {
        return axios.delete(`/hybrid/${action.id}`).then(() => {
          dispatch(action);
        });
      }
      default: {
        return dispatch(action);
      }
    }
  };
};

export const StoreReducer = (state, action) => {
  Object.freeze(state);

  switch (action.type) {
    case actionTypes.LOGIN: {
      return { ...state, session: action.session };
    }
    case actionTypes.LOGOUT: {
      return { ...state, session: { authenticated: false } };
    }
    case actionTypes.CREATE_HYBRID: {
      const newHybrids = { ...state.hybrids };
      newHybrids[action.hybrid.id] = action.hybrid;
      return { ...state, hybrids: newHybrids };
    }
    case actionTypes.UPDATE_HYBRID: {
      const newHybrids = { ...state.hybrids };
      const oldH = newHybrids[action.id];
      newHybrids[action.id] = {
        ...oldH,
        id: action.id,
        name: action.name,
        url: action.url,
        tags: action.tags,
        grid: action.grid,
      };
      return { ...state, hybrids: newHybrids };
    }
    case actionTypes.DELETE_HYBRID: {
      const newHybrids = { ...state.hybrids };
      delete newHybrids[action.id];
      return { ...state, hybrids: newHybrids };
    }
    default:
      return state;
  }
};
