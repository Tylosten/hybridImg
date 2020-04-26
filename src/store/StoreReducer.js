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
        return axios
          .post('/login', {
            username: action.username,
            password: action.password,
          })
          .then(res => {
            console.log(res.data);
            return dispatch({ ...action, session: res.data });
          });
      }
      case actionTypes.LOGOUT: {
        return axios.get('/logout').finally(() => {
          return dispatch(action);
        });
      }
      case actionTypes.CREATE_USER: {
        return axios
          .post('/register', {
            username: action.username,
            password: action.password,
          })
          .then(res => {
            return dispatch({ ...action, user: res.data });
          });
      }
      case actionTypes.DELETE_USER: {
        return axios
          .post('/user/delete', {
            id: action.id,
          })
          .then(() => {
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

const addElementReducer = (state, collection, element) => {
  const newCollection = { ...state[collection] };
  newCollection[element.id] = element;
  const newState = { ...state };
  newState[collection] = newCollection;
  return newState;
};

const removeElementReduccer = (state, collection, id) => {
  const newCollection = { ...state[collection] };
  delete newCollection[id];
  const newState = { ...state };
  newState[collection] = newCollection;
  return newState;
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
    case actionTypes.CREATE_USER: {
      return addElementReducer(state, 'users', action.user);
    }
    case actionTypes.DELETE_USER: {
      return removeElementReduccer(state, 'users', action.id);
    }
    case actionTypes.CREATE_HYBRID: {
      return addElementReducer(state, 'hybrids', action.hybrid);
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
      return removeElementReduccer(state, 'hybrids', action.id);
    }
    case actionTypes.CREATE_TEMPLATE: {
      return addElementReducer(state, 'templates', action.template);
    }
    case actionTypes.DELETE_TEMPLATE: {
      return removeElementReduccer(state, 'templates', action.id);
    }
    case actionTypes.CREATE_GRID: {
      return addElementReducer(state, 'grids', action.grid);
    }
    case actionTypes.DELETE_GRID: {
      return removeElementReduccer(state, 'grids', action.id);
    }
    case actionTypes.CREATE_TAG: {
      return addElementReducer(state, 'tags', action.tag);
    }
    default:
      return state;
  }
};
