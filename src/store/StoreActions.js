export const actionTypes = {
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  CREATE_USER: 'CREATE_USER',
  DELETE_USER: 'DELETE_USER',
  CREATE_HYBRID: 'CREATE_HYBRID',
  UPDATE_HYBRID: 'UPDATE_HYBRID',
  DELETE_HYBRID: 'DELETE_HYBRID',
  CREATE_TEMPLATE: 'CREATE_TEMPLATE',
  DELETE_TEMPLATE: 'DELETE_TEMPLATE',
  CREATE_TAG: 'CREATE_TAG',
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

export const createHybrid = ({ name, file, tags, grid }) => ({
  type: actionTypes.CREATE_HYBRID,
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

export const createTemplate = ({ name, lineThemes, colThemes }) => ({
  type: actionTypes.CREATE_TEMPLATE,
  name,
  lineThemes,
  colThemes,
});

export const deleteTemplate = ({ id }) => ({
  type: actionTypes.DELETE_TEMPLATE,
  id,
});

export const createGrid = ({ name, isOpen, template }) => ({
  type: actionTypes.CREATE_GRID,
  name,
  isOpen,
  template,
});

export const deleteGrid = ({ id }) => ({
  type: actionTypes.DELETE_GRID,
  id,
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
