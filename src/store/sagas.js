import { take, put, select } from 'redux-saga/effects';
import axios from 'axios';
import { v4 as uuid } from 'uuid';

import * as mutations from './mutations';
const url = 'http://localhost:4242/';

export function* hybridSavingSaga() {
  while (true) {
    const { url, tags, grid } = yield take(mutations.REQUEST_HYBRID_CREATING);
    const id = uuid();
    const hybridtags = tags.map(t => t.name).join('/');
    const user = 'U1';
    yield put(mutations.createHybrid(id, hybridtags, url, tags, grid, user));
    const { res } = yield axios.post(url + '/hybrid/new', {
      hybrid: {
        id,
        hybridtags,
        url,
        tags,
        grid,
        user,
      },
    });
    console.log('Got response : ', res);
  }
}

export function* hybridModificationSaga() {
  while (true) {
    const hybrid = yield take([
      mutations.SET_HYBRID_URL,
      mutations.SET_HYBRID_TAGS,
      mutations.SET_HYBRID_NAME,
      mutations.SET_HYBRID_GRID,
    ]);
    const { res } = yield axios.post(url + '/hybrid/update', {
      hybrid,
    });
    console.log('Got response : ', res);
  }
}
