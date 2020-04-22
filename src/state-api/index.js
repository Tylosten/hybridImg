import axios from 'axios';
import { v4 as uuid } from 'uuid';

class StateApi {
  constructor(rawData) {
    this.data = {
      hybrids: this.mapIntoObject(rawData.data.hybrids),
      grids: this.mapIntoObject(rawData.data.grids),
      users: this.mapIntoObject(rawData.data.users),
      tags: this.mapIntoObject(rawData.data.tags),
    };
    this.subscriptions = {};
    this.lastSubscriptionId = -1;
  }

  mapIntoObject(arr) {
    return arr.reduce((acc, curr) => {
      acc[curr.id] = curr;
      return acc;
    }, {});
  }

  subscribe = cb => {
    this.lastSubscriptionId++;
    this.subscriptions[this.lastSubscriptionId] = cb;
    return this.lastSubscriptionId;
  };

  unsubscribe = subscriptionId => {
    delete this.subscriptions[subscriptionId];
  };

  notifySubscribers = () => {
    Object.values(this.subscriptions).forEach(cb => {
      cb();
    });
  };

  mergeWithState = stateChange => {
    this.data = {
      ...this.data,
      ...stateChange,
    };
    this.notifySubscribers();
  };

  addHybrid = async hybrid => {
    const { name, url, tags, grid } = hybrid;
    const res = await axios.post('/hybrid/new', {
      id: uuid(),
      user: 'U1',
      name,
      url,
      tags,
      grid,
    });
    const newHybrids = { ...this.data.hybrids };
    newHybrids[res.data.id] = res.data;
    this.mergeWithState({
      hybrids: newHybrids,
    });
  };

  saveHybrid = async ({ id, url, tags, grid }) => {
    const oldH = this.getHybrid(id);
    const newH = { ...oldH, url, tags, grid };

    await axios.post('/hybrid/update', newH);

    const newHybrids = { ...this.data.hybrids };
    newHybrids[id] = newH;
    this.mergeWithState({
      hybrids: newHybrids,
    });
  };

  deleteHybrid = async hybridId => {
    await axios.delete(`/hybrid/${hybridId}`);
    const newHybrids = { ...this.data.hybrids };
    delete newHybrids[hybridId];
    this.mergeWithState({
      hybrids: newHybrids,
    });
  };

  getHybrid = hybridId => {
    const hybrid = this.data.hybrids[hybridId];
    if (!hybrid) {
      throw 'Invalid hybrid id : ' + hybridId;
    }
    return {
      ...hybrid,
      tags: hybrid.tags.map(id => this.data.tags[id]),
    };
  };

  getHybridTags = hybridId => {
    return this.getHybrid(hybridId).tags;
  };

  getGrid = gridId => {
    const grid = this.data.grids[gridId];
    return {
      ...grid,
      lineThemes: grid.lineThemes.map(id => this.data.tags[id]),
      colThemes: grid.colThemes.map(id => this.data.tags[id]),
    };
  };

  getGridHybrid = ({ grid, line, col }) => {
    const hybrid = Object.values(this.data.hybrids).find(
      h => h.grid == grid && h.tags.includes(line.id) && h.tags.includes(col.id)
    );
    return hybrid
      ? {
        ...hybrid,
        tags: hybrid.tags.map(id => this.data.tags[id]),
      }
      : undefined;
  };

  getGridHybrids = grid => {
    return Object.values(this.data.hybrids).filter(h => h.grid === grid);
  };

  getState = () => this.data;
}

export default StateApi;
