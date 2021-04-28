import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import * as Effect from 'redux-saga/effects';
import { fetchVAT } from '../features/vatform/sagas';
import { FETCH_VAT_REQUEST } from '../features/vatform/types';
import { reducer as vatReducer } from '../features/vatform/reducer';
import { loadState, saveState } from './localStorage'

const takeLatest: any = Effect.takeLatest;

function* rootSaga() {
  yield takeLatest(FETCH_VAT_REQUEST, fetchVAT);
}

const persistentState = loadState();

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const configureStore = (storeEnhancers = []) => {
  const sagaMiddleware = createSagaMiddleware();

  const store = createStore(
    vatReducer,
    persistentState,
    compose(
      ...[applyMiddleware(sagaMiddleware), ...storeEnhancers]
    )
  );

  sagaMiddleware.run(rootSaga);

  store.subscribe(() => saveState(store.getState()));

  return store;
};
