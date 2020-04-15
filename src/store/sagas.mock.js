import { take, put, select } from 'redux-saga/effects';
import { v4 as uuid } from 'uuid';

import * as mutations from './mutations';

export function* hybridSavingSaga() {
  while (true) {
    const { hybrid } = yield take(mutations.REQUEST_HYBRID_SAVING);
    console.log('hybrid : ', hybrid);
    yield put(
      mutations.saveHybrid(
        hybrid.id || uuid(),
        hybrid.grid,
        hybrid.tags,
        'Mag',
        hybrid.url
      )
    );
  }
}
