import StateApi from '../store';
import defaultState from '../server/dev/defaultState';

const store = new StateApi(defaultState);

describe('StateApi', () => {
  it('exposes hybrid images as an object', () => {
    const hybrids = store.hybrids;
    const hybrid0 = defaultState.hybrids[0];

    expect(hybrids).toHaveProperty(hybrid0.id);
    const hybrid1 = hybrids[hybrid0.id];
    expect(hybrid1.name).toBe(hybrid0.name);
    expect(hybrid1.url).toBe(hybrid0.url);
    expect(hybrid1.user).toBe(hybrid0.user);
    expect(hybrid1.grid).toBe(hybrid0.grid);
  });
});
