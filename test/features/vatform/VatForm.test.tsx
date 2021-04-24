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
});
