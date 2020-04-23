export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_HYBRID: 'CREATE_HYBRID',
  UPDATE_HYBRID: 'UPDATE_HYBRID',
  DELETE_HYBRID: 'DELETE_HYBRID',
  CREATE_GRID: 'CREATE_GRID',
  DELETE_GRID: 'DELETE_GRID',
};

export const login = (username, password) => ({
  type: actionTypes.LOGIN,
  username,
  password,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const createHybrid = ({ id, name, file, tags, grid }) => ({
  type: actionTypes.CREATE_HYBRID,
  id,
  name,
  file,
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
