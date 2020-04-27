export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_USER: 'CREATE_USER',
  DELETE_USER: 'DELETE_USER',
  CREATE_HYBRID: 'CREATE_HYBRID',
  UPDATE_HYBRID: 'UPDATE_HYBRID',
  DELETE_HYBRID: 'DELETE_HYBRID',
  CREATE_TAG: 'CREATE_TAG',
  CREATE_GRID: 'CREATE_GRID',
  DELETE_GRID: 'DELETE_GRID',
  UPDATE_CELL: 'UPDATE_CELL',
};

export const login = (username, password) => ({
  type: actionTypes.LOGIN,
  username,
  password,
});

export const logout = () => ({
  type: actionTypes.LOGOUT,
});

export const createHybrid = ({ name, file, tags, cell }) => ({
  type: actionTypes.CREATE_HYBRID,
  name,
  file,
  tags,
  cell,
});

export const updateHybrid = ({ id, name, tags, file }) => ({
  type: actionTypes.UPDATE_HYBRID,
  id,
  name,
  tags,
  file,
});

export const deleteHybrid = id => ({
  type: actionTypes.DELETE_HYBRID,
  id,
});

export const createGrid = ({ name, lineThemes, colThemes }) => ({
  type: actionTypes.CREATE_GRID,
  name,
  lineThemes,
  colThemes,
});

export const deleteGrid = ({ id }) => ({
  type: actionTypes.DELETE_GRID,
  id,
});

export const updateCell = ({ id, hybrids }) => ({
  type: actionTypes.UPDATE_CELL,
  id,
  hybrids,
});

export const createTag = ({ name }) => ({
  type: actionTypes.CREATE_TAG,
  name,
});

export const createUser = ({ username, password }) => ({
  type: actionTypes.CREATE_USER,
  username,
  password,
});

export const deleteUser = ({ id }) => ({
  type: actionTypes.DELETE_USER,
  id,
});
