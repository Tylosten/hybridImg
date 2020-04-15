import { take, put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

import * as mutations from './mutations';

export function* hybridSavingSaga() {
  while (true) {
    const { url, tags, grid } = yield take(mutations.REQUEST_HYBRID_CREATING);
    yield put(
      mutations.createHybrid(
        uuid(),
        tags.map(t => t.name).join('/'),
        url,
        tags,
        grid,
        'U1'
      )
    );
  }
}
