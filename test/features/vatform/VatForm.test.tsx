import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import {
  Element,
  LabelFor,
  createContainer,
  withEvent
} from '../../helpers';
import { VatForm } from '../../../src/features/vatform/VatForm';

describe('VatForm', () => {
  let element: Element, labelFor: LabelFor, render;

  beforeEach(() => {
    ({ element, render, labelFor } = createContainer());
  });

  it('renders a form', () => {
    render(<VatForm />);
    expect(element('form[id="vatForm"]')).not.toBeNull();
  });

  describe('NIP field', () => {
    it('renders as a text box', () => {
      render(<VatForm />);
      const nipField = element('form[id="vatForm"]')!.elements.nip;

      expect(nipField).not.toBeNull();
      expect(nipField.tagName).toEqual('INPUT');
      expect(nipField.type).toEqual('text');
    });

    it('renders a label for the NIP field', () => {
      render(<VatForm />);
      expect(labelFor('nip')).not.toBeNull();
      expect(labelFor('nip')!.textContent).toEqual('NIP number');
    });

    it('assign an id that matches the label id to the width field', () => {
      render(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.id).toEqual('nip');
    });

    it('includes the existing value for the NIP', () => {
      render(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.value).toEqual('');
    });

    it('react on change event', () => {
      render(<VatForm />);
      const nipFiled = element('form[id="vatForm"]')!.elements.nip;

      expect(nipFiled.value).toEqual('');

      ReactTestUtils.Simulate.change(nipFiled, withEvent('nip', '123'));

      expect(nipFiled.value).toEqual('123');
    });
  });

  describe('submit button', () => {
    const submitButton = () => element('input[type="submit"]');
    
    it('has a submit button', () => {
      render(<VatForm />);
      expect(submitButton()).not.toBeNull();
    });
  });
});
