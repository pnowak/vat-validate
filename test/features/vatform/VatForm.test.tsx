import React from 'react';
import {
  Element,
  createContainer
} from '../../helpers';
import { VatForm } from '../../../src/features/vatform/VatForm';

describe('VatForm', () => {
  let element: Element, render;

  beforeEach(() => {
    ({ element, render } = createContainer());
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
  });
});
