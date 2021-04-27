import { put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { 
  FETCH_VAT_STARTED,
  FETCH_VAT_SUCCEEDED,
  FETCH_VAT_FAILED } from './types';
import { fetchJSON } from '../../helpers';
import { API_BASE_URL, ACCESS_KEY } from '../../config';

type Props = {
  company: TemplateStringsArray
};

export function* fetchVAT({ company }: Props): SagaIterator {
  yield put({ type: FETCH_VAT_STARTED });

  try {
    const res = yield call(fetchJSON, `${API_BASE_URL}?access_key=${ACCESS_KEY}&vat_number=PL${company}`);

    yield put({
      type: FETCH_VAT_SUCCEEDED,
      payload: {
        company: res
      }
    })

  } catch(error) {
    yield put({
      type: FETCH_VAT_FAILED,
      payload: { error: error.message } 
    })
  }
}