import { put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import dotenv from 'dotenv';

import { 
  FETCH_VAT_STARTED,
  FETCH_VAT_SUCCEEDED,
  FETCH_VAT_FAILED } from './types';

dotenv.config({ path: '.env' });

type Props = {
  vat: TemplateStringsArray
};

const fetchJSON = async (input: string): Promise<Record<string, unknown>> => {
  const res = await fetch(input);
  const data = await res.json();

  return data;
};

export function* fetchVAT({ vat }: Props): SagaIterator {
  yield put({ type: FETCH_VAT_STARTED });

  try {
    const res = yield call(fetchJSON, `http://www.apilayer.net/api/validate?access_key=${process.env.KEY_APILAYER}&vat_number=PL${vat}`);
    console.log(res);

    yield put({
      type: FETCH_VAT_SUCCEEDED,
      payload: {
        vat: res
      }
    })

  } catch(error) {
    yield put({
      type: FETCH_VAT_FAILED,
      payload: { error: error.message } 
    })
  }
}