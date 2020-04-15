export const REQUEST_HYBRID_CREATING = 'REQUEST_HYBRID_CREATING';
export const CREATE_HYBRID = 'CREATE_HYBRID';
export const SET_HYBRID_NAME = 'SET_HYBRID_NAME';
export const SET_HYBRID_URL = 'SET_HYBRID_URL';
export const SET_HYBRID_TAGS = 'SET_HYBRID_TAGS';
export const SET_HYBRID_GRID = 'SET_HYBRID_GRID';

export const requestHybridCreating = (url, tags, grid) => ({
  type: REQUEST_HYBRID_CREATING,
  url,
  tags,
  grid,
});

export const createHybrid = (id, name, url, tags, grid, user) => ({
  type: CREATE_HYBRID,
  id,
  name,
  url,
  tags,
  grid,
  user,
});

export const setHybridName = (id, name) => ({
  type: SET_HYBRID_NAME,
  id,
  name,
});
export const setHybridUrl = (id, url) => ({
  type: SET_HYBRID_URL,
  id,
  url,
});
export const setHybridTags = (id, tags) => ({
  type: SET_HYBRID_TAGS,
  id,
  tags,
});
export const setHybridGrid = (id, grid) => ({
  type: SET_HYBRID_GRID,
  id,
  grid,
});
