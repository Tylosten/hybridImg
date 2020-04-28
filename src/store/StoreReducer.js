import React from 'react';
import axios from 'axios';
axios.defaults.withCredentials = true;
import { actionTypes } from './StoreActions';

export const StoreContext = React.createContext();

const addTags = (tagsArr, dispatch) => {
  return Promise.all(
    tagsArr.map(tag => {
      if (typeof tag === 'string') {
        return tag;
      }
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
    console.log('MIDDLE', action);
    switch (action.type) {
      case actionTypes.LOGIN: {
        return axios
          .post('/login', {
            username: action.username,
            password: action.password,
          })
          .then(res => {
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
        return addTags(action.tags, dispatch).then(tags => {
          const formData = new FormData();
          formData.append('name', action.name);
          formData.append('file', action.file);
          formData.append('tags', tags);
          return axios
            .post('/hybrid/new', formData)
            .then(res => {
              if (action.cell) {
                return axios
                  .post('/cell/update/', {
                    id: action.cell.id,
                    hybrids: [...action.cell.hybrids, res.data.id],
                  })
                  .then(() => res);
              }
              return res;
            })
            .then(res => {
              return dispatch({ ...action, hybrid: res.data });
            });
        });
      }
      case actionTypes.UPDATE_HYBRID: {
        return addTags(action.tags, dispatch).then(tags => {
          const formData = new FormData();
          formData.append('id', action.id);
          formData.append('name', action.name);
          formData.append('file', action.file);
          formData.append('tags', tags);
          return axios.post('/hybrid/update', formData).then(res => {
            return dispatch({ ...action, tags, hybrid: res.data });
          });
        });
      }
      case actionTypes.DELETE_HYBRID: {
        return axios.post('/hybrid/delete', { id: action.id }).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.CREATE_GRID: {
        return Promise.all([
          addTags(action.lineThemes, dispatch),
          addTags(action.colThemes, dispatch),
        ]).then(tags => {
          return axios
            .post('/grid/new', {
              name: action.name,
              lineThemes: tags[0],
              colThemes: tags[1],
            })
            .then(res => {
              return dispatch({
                ...action,
                grid: res.data.grid,
                cells: res.data.cells,
              });
            });
        });
      }
      case actionTypes.DELETE_GRID: {
        return axios.post('/grid/delete', { id: action.id }).then(() => {
          return dispatch(action);
        });
      }
      case actionTypes.UPDATE_CELL: {
        return axios
          .post('/cell/update/', {
            id: action.id,
            hybrids: action.hybrids,
          })
          .then(() => {
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
  console.log('ACTION', action);
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
      const newState = addElementReducer(state, 'hybrids', action.hybrid);
      if (action.cell) {
        const newCells = { ...newState.cells };
        newCells[action.cell.id].hybrids = [
          ...newCells[action.cell.id].hybrids,
          action.hybrid.id,
        ];
        newState.cells = newCells;
      }
      return newState;
    }
    case actionTypes.UPDATE_HYBRID: {
      const newHybrids = { ...state.hybrids };
      newHybrids[action.id] = action.hybrid;
      return { ...state, hybrids: newHybrids };
    }
    case actionTypes.DELETE_HYBRID: {
      return removeElementReduccer(state, 'hybrids', action.id);
    }
    case actionTypes.CREATE_GRID: {
      let newState = addElementReducer(state, 'grids', action.grid);
      action.cells.forEach(cell => {
        newState = addElementReducer(newState, 'cells', cell);
      });
      return newState;
    }
    case actionTypes.DELETE_GRID: {
      let newState = removeElementReduccer(state, 'grids', action.id);
      Object.values(state.cells)
        .filter(c => c.grid === action.id)
        .forEach(c => {
          newState = removeElementReduccer(newState, 'cells', c.id);
        });
      return newState;
    }
    case actionTypes.UPDATE_CELL: {
      const newCells = { ...state.cells };
      newCells[action.id].hybrids = action.hybrids;
      return { ...state, cells: newCells };
    }
    case actionTypes.CREATE_TAG: {
      return addElementReducer(state, 'tags', action.tag);
    }
    default:
      return state;
  }
};
