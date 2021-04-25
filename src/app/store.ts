import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Effect from 'redux-saga/effects';
import { fetchVAT } from '../features/vatform/sagas';
import { FETCH_VAT_REQUEST } from '../features/vatform/types';
import { rootReducer } from './rootReducer';

const takeLatest: any = Effect.takeLatest;

function* rootSaga() {
  yield takeLatest(FETCH_VAT_REQUEST, fetchVAT);
}

export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    rootReducer,
    compose(
      ...[applyMiddleware(sagaMiddleware), ...storeEnhancers]
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
};
