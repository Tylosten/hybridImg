export const REQUEST_HYBRID_SAVING = 'REQUEST_HYBRID_SAVING';
export const SAVE_HYBRID = 'SAVE_HYBRID';

export const requestHybridSaving = hybrid => ({
  type: REQUEST_HYBRID_SAVING,
  hybrid,
});

export const saveHybrid = (hybridId, gridId, tags, author, url) => ({
  type: SAVE_HYBRID,
  hybridId,
  gridId,
  tags,
  author,
  url,
});
