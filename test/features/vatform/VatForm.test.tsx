import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import { expectRedux } from 'expect-redux';
import {
  Element,
  LabelFor,
  createContainerWithStore,
  withEvent,
  Form
} from '../../helpers';
import { VatForm } from '../../../src/features/vatform/VatForm';
import { App } from '../../../src/app/App';

describe('VatForm', () => {
  let element: Element, labelFor: LabelFor, form: Form,
    renderWithStore, store;

  beforeEach(() => {
    ({ element, labelFor, form, renderWithStore, store } = createContainerWithStore());
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
  });
});
