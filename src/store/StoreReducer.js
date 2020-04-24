import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { actionTypes } from './StoreActions';

export const StoreContext = React.createContext();

const addTags = (tagsArr, dispatch) => {
  return Promise.all(
    tagsArr.map(tag => {
      if (!tag.id) {
        return axios
          .post('/tag/new', {
            name: tag.name,
          })
          .then(res => {
            dispatch({ type: actionTypes.CREATE_TAG, tag: res.data });
            return res.data.id;
          });
      }
      return tag.id;
    })
  );
};

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
            return dispatch({ ...action, session });
          });
      }
      case actionTypes.LOGOUT: {
        return axios
          .get('/logout')
          .catch(err => {
            console.info(err);
          })
          .finally(() => {
            return dispatch(action);
          });
      }
      case actionTypes.CREATE_HYBRID: {
        const formData = new FormData();
        formData.append('name', action.name);
        formData.append('file', action.file);
        formData.append('tags', action.tags);
        formData.append('grid', action.grid);
        return axios.post('/hybrid/new', formData).then(res => {
          return dispatch({ ...action, hybrid: res.data });
        });
      }
      case actionTypes.UPDATE_HYBRID: {
        return axios.post('/hybrid/update', action).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.DELETE_HYBRID: {
        return axios.post('/hybrid/delete', { id: action.id }).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.CREATE_TEMPLATE: {
        return Promise.all([
          addTags(action.lineThemes, dispatch),
          addTags(action.colThemes, dispatch),
        ]).then(tags => {
          return axios
            .post('/template/new', {
              name: action.name,
              lineThemes: tags[0],
              colThemes: tags[1],
            })
            .then(res => {
              return dispatch({ ...action, template: res.data });
            });
        });
      }
      case actionTypes.DELETE_TEMPLATE: {
        return axios.post('/template/delete', { id: action.id }).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.CREATE_GRID: {
        return axios
          .post('/grid/new', {
            name: action.name,
            isOpen: action.isOpen,
            template: action.template,
          })
          .then(res => {
            return dispatch({ ...action, grid: res.data });
          });
      }
      case actionTypes.DELETE_GRID: {
        return axios.post('/grid/delete', { id: action.id }).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.CREATE_TAG: {
        return axios
          .post('/tag/new', {
            name: action.name,
          })
          .then(res => {
            return dispatch({ ...action, tag: res.data });
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
    case actionTypes.DELETE_TEMPLATE: {
      const newTemplates = { ...state.templates };
      delete newTemplates[action.id];
      return { ...state, templates: newTemplates };
    }
    case actionTypes.CREATE_GRID: {
      const newGrids = { ...state.grids };
      newGrids[action.grid.id] = action.grid;
      return { ...state, grids: newGrids };
    }
    case actionTypes.DELETE_GRID: {
      const newGrids = { ...state.grids };
      delete newGrids[action.id];
      return { ...state, grids: newGrids };
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
