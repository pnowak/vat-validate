import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expectRedux } from 'expect-redux';
import 'whatwg-fetch';
import {
  Element,
  LabelFor,
  createContainerWithStore,
  withEvent,
  Form
} from '../../helpers';
import { VatForm } from '../../../src/features/vatform/VatForm';
import { App } from '../../../src/app/App';
import { API_BASE_URL, ACCESS_KEY } from '../../../src/config';
import { fetchJSON } from '../../../src/helpers';
import { VATAttributes } from '../../../src/features/vatform/types';

describe('VatForm', () => {
  let element: Element, labelFor: LabelFor, form: Form,
    renderWithStore, store;

  const company: VATAttributes = {
    company_address: 'AL. GRUNWALDZKA 212\n80-266 GDAŃSK',
    company_name: 'RTCLAB SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
    valid: true
  };

  beforeEach(() => {
    ({ element, labelFor, form, renderWithStore, store } = createContainerWithStore());
    jest
      .spyOn(window, 'fetch')
      .mockReturnValue(fetchJSON(company))
  });

  it('render a form', () => {
    renderWithStore(<VatForm />);

    expect(element('form[id="vatForm"]')).not.toBeNull();
  });

  it('dispatches FETCH_VAT_REQUEST when submitting data', () => {
    renderWithStore(<App />);
    ReactTestUtils.Simulate.submit(form('vatForm'));

    return expectRedux(store)
      .toDispatchAnAction()
      .ofType('FETCH_VAT_REQUEST');
  });

  it.skip('fetches data after submitting', async () => {
    renderWithStore(<App />);

    expect(window.fetch).toHaveBeenCalledWith(
      `${API_BASE_URL}?access_key=${ACCESS_KEY}&vat_number=PL5842748894`,
      expect.objectContaining(
        {
          company_address: 'AL. GRUNWALDZKA 212\n80-266 GDAŃSK',
          company_name: 'RTCLAB SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ',
          valid: true
        }
      )
    );
  });

  describe('NIP field', () => {
    it('render as a text box', () => {
      renderWithStore(<VatForm />);
      const nipField = element('form[id="vatForm"]')!.elements.nip;

      expect(nipField).not.toBeNull();
      expect(nipField.tagName).toEqual('INPUT');
      expect(nipField.type).toEqual('text');
    });

    it('render a label for the NIP field', () => {
      renderWithStore(<VatForm />);

      expect(labelFor('nip')).not.toBeNull();
      expect(labelFor('nip')!.textContent).toEqual('NIP number');
    });

    it('assign an id that matches the label id to the width field', () => {
      renderWithStore(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.id).toEqual('nip');
    });

    it('includes the existing value for the NIP', () => {
      renderWithStore(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.value).toEqual('');
    });

    it('react on change event', () => {
      renderWithStore(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.value).toEqual('');

      ReactTestUtils.Simulate.change(nipFiled, withEvent('nip', '123'));

      expect(nipFiled.value).toEqual('123');
    });

    it('reset value after submitting', async () => {
      renderWithStore(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      await store.dispatch({ type: 'FETCH_VAT_REQUEST' });

      expect(nipFiled.value).toEqual('');
    });
  });

  describe('submit button', () => {
    const submitButton = () => element('input[type="submit"]');
    
    it('has a submit button', () => {
      renderWithStore(<VatForm />);

      expect(submitButton()).not.toBeNull();
    });

    it('disables the submit button when submitting', async () => {
      renderWithStore(<VatForm />);
      store.dispatch({ type: 'FETCH_VAT_REQUEST' });

      expect(submitButton().disabled).toBeTruthy();
    });

    it('initially does not disable submit button', () => {
      renderWithStore(<VatForm />);

      expect(submitButton().disabled).toBeFalsy();
    });
  });

  describe('has an output element which', () => {
    it('render a div with the right id', () => {
      renderWithStore(<VatForm />);

      expect(element('div#output')).not.toBeNull();
    });

    it('initially nothing to show', () => {
      renderWithStore(<VatForm />);

      expect(element('div#output').textContent).toEqual('');
    });

    it.skip('shows company details after submitting data', async () => {
      renderWithStore(<VatForm />);
      await window.fetch.mockReturnValue(fetchJSON(`http://www.apilayer.net/api/validate?access_key=${process.env.KEY_APILAYER}&vat_number=PL5842748894`))
      
      const output = () => element('div#output');
      const paragraphs = output().querySelectorAll('p');

      expect(output().children).toHaveLength(3);
      expect(paragraphs[0].textContent).toEqual('Nazwa firmy: RTCLAB SPÓŁKA Z OGRANICZONĄ ODPOWIEDZIALNOŚCIĄ');
    });
  });
});
