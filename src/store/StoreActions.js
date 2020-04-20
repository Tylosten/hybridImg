export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REQUEST_CREATE_HYBRID: 'REQUEST_CREATE_HYBRID',
  CREATE_HYBRID: 'CREATE_HYBRID',
  UPDATE_HYBRID: 'UPDATE_HYBRID',
  DELETE_HYBRID: 'DELETE_HYBRID',
};

export const login = (username, password) => ({
  type: actionTypes.LOGIN,
  username,
  password,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const requestCreateHybrid = ({ name, url, tags, grid }) => ({
  type: actionTypes.REQUEST_CREATE_HYBRID,
  name,
  url,
  tags,
  grid,
});

export const createHybrid = ({ id, name, url, tags, grid }) => ({
  type: actionTypes.CREATE_HYBRID,
  id,
  name,
  url,
  tags,
  grid,
});

export const updateHybrid = ({ id, name, url, tags, grid }) => ({
  type: actionTypes.UPDATE_HYBRID,
  id,
  name,
  url,
  tags,
  grid,
});

export const deleteHybrid = id => ({
  type: actionTypes.DELETE_HYBRID,
  id,
});
