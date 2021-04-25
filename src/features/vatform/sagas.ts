import { put, call } from 'redux-saga/effects';
import { SagaIterator } from '@redux-saga/core';
import { 
  FETCH_VAT_STARTED,
  FETCH_VAT_SUCCEEDED,
  FETCH_VAT_FAILED } from './types';

type Props = {
  vat: TemplateStringsArray
};

function soapRequest(vat: TemplateStringsArray): string {
  return `<soap:Envelope xmlns:soap="http://schemas.xmlsoap.org/soap/envelope/"
    xmlns:tns1="urn:ec.europa.eu:taxud:vies:services:checkVat:types"
    xmlns:impl="urn:ec.europa.eu:taxud:vies:services:checkVat">
    <soap:Header>
    </soap:Header>
    <soap:Body>
        <tns1:checkVat xmlns:tns1="urn:ec.europa.eu:taxud:vies:services:checkVat:types"
        xmlns="urn:ec.europa.eu:taxud:vies:services:checkVat:types">
        <tns1:countryCode>PL</tns1:countryCode>
        <tns1:vatNumber>${vat}</tns1:vatNumber>
        </tns1:checkVat>
    </soap:Body>
    </soap:Envelope>`;
}

const fetch = (url: RequestInfo, vat: Props) => {
  const soapData = soapRequest`vat`;
  console.log(soapData, vat);

  window.fetch(url, {
    body: soapData,
    method: 'POST',
    credentials: 'same-origin',
    headers: { 'Content-Type': 'text/xml', dataType: 'xml' }
  });
};

export function* fetchVAT({ vat }: Props): SagaIterator {
  yield put({ type: FETCH_VAT_STARTED });

  try {
    const result = yield call(fetch, 'http://ec.europa.eu/taxation_customs/vies/checkVatService.wsdl', vat);

    yield put({
      type: FETCH_VAT_SUCCEEDED,
      payload: {
        vat: result.data
      }
    })

  } catch(error) {
    yield put({
      type: FETCH_VAT_FAILED,
      payload: { error: error.message } 
    })
  }
}