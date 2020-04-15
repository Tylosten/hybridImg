export const REQUEST_HYBRID_SAVING = 'REQUEST_HYBRID_SAVING';
export const SAVE_HYBRID = 'SAVE_HYBRID';
export const SET_HYBRID_NAME = 'SET_HYBRID_NAME';
export const SET_HYBRID_URL = 'SET_HYBRID_URL';
export const SET_HYBRID_TAGS = 'SET_HYBRID_TAGS';
export const SET_HYBRID_GRID = 'SET_HYBRID_GRID';

export const requestHybridSaving = hybrid => ({
  type: REQUEST_HYBRID_SAVING,
  hybrid,
});

export const saveHybrid = (
  hybridId,
  hybridName,
  gridId,
  tags,
  author,
  url
) => ({
  type: SAVE_HYBRID,
  hybridId,
  hybridName,
  gridId,
  tags,
  author,
  url,
});

export const setHybridName = (id, name) => ({
  type: SET_HYBRID_NAME,
  hybridId: id,
  name,
});
export const setHybridUrl = (id, url) => ({
  type: SET_HYBRID_URL,
  hybridId: id,
  url,
});
export const setHybridTags = (id, tags) => ({
  type: SET_HYBRID_TAGS,
  hybridId: id,
  tags,
});
export const setHybridGrid = (id, gridId) => ({
  type: SET_HYBRID_GRID,
  hybridId: id,
  gridId,
});
