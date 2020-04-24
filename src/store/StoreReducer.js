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
        return axios.post('/hybrid/delete', { id: action.id }).then(() => {
          dispatch(action);
        });
      }
      case actionTypes.CREATE_TEMPLATE: {
        return axios
          .post('/template/new', {
            name: action.name,
            colThemes: action.colThemes,
            lineThemes: action.lineThemes,
          })
          .then(res => {
            dispatch({ ...action, template: res.data });
          });
      }
      case actionTypes.CREATE_TAG: {
        return axios
          .post('/tag/new', {
            name: action.name,
          })
          .then(res => {
            dispatch({ ...action, tag: res.data });
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

      if (action.name) {
        newHybrids[action.id].name = action.name;
      }
      if (action.url) {
        newHybrids[action.id].url = action.url;
      }
      if (action.tags) {
        newHybrids[action.id].tags = action.tags;
      }
      if (action.grid) {
        newHybrids[action.id].grid = action.grid;
      }

      return { ...state, hybrids: newHybrids };
    }
    case actionTypes.DELETE_HYBRID: {
      const newHybrids = { ...state.hybrids };
      delete newHybrids[action.id];
      return { ...state, hybrids: newHybrids };
    }
    case actionTypes.CREATE_TEMPLATE: {
      const newTemplates = { ...state.templates };
      newTemplates[action.template.id] = action.template;
      return { ...state, templates: newTemplates };
    }
    case actionTypes.CREATE_TAG: {
      const newTags = { ...state.tags };
      newTags[action.tag.id] = action.tag;
      return { ...state, tags: newTags };
    }
    default:
      return state;
  }
};
