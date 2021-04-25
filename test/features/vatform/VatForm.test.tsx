import React from 'react';
import {
  Element,
  LabelFor,
  createContainer
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
  });

  describe('submit button', () => {
    const submitButton = () => element('input[type="submit"]');
    
    it('has a submit button', () => {
      render(<VatForm />);
      expect(submitButton()).not.toBeNull();
    });
  });
});
