import initStore from '../store';
import defaultState from '../server/dev/defaultState';

const store = initStore(defaultState);

describe('StateApi', () => {
  it('exposes user images as an object', () => {
    const users = store.users;
    const user0 = defaultState.users[0];

    expect(users).toHaveProperty(user0.id);
    const user1 = users[user0.id];
    expect(user1.name).toBe(user0.name);
    expect(user1.url).toBe(user0.url);
    expect(user1.user).toBe(user0.user);
    expect(user1.grid).toBe(user0.grid);
  });
});
