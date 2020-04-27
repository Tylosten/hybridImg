const mapIntoObject = arr => {
  return arr.reduce((acc, curr) => {
    acc[curr.id] = curr;
    return acc;
  }, {});
};

const initStore = rawData => ({
  session: rawData.session || { authenticated: false },
  hybrids: mapIntoObject(rawData.hybrids || []),
  grids: mapIntoObject(rawData.grids || []),
  users: mapIntoObject(rawData.users || []),
  tags: mapIntoObject(rawData.tags || []),
  cells: mapIntoObject(rawData.cells || []),
});

export default initStore;
