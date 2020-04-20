class StateApi {
  constructor(rawData) {
    this.session = rawData.session || { authenticated: false };
    this.hybrids = this.mapIntoObject(rawData.hybrids);
    this.grids = this.mapIntoObject(rawData.grids);
    this.users = this.mapIntoObject(rawData.users);
    this.tags = this.mapIntoObject(rawData.tags);
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }
}

export default StateApi;
