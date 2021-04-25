import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Form = styled.form`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  gap: 1rem;
  align-content: center;
  align-items: center;
  justify-items: center;
  font-size: 1.5rem;
  line-height: 1.5;
  font-weight: 600;
  label {
    display: block;
    margin-bottom: -3rem;
  }
  input {
    width: 40%;
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #2E2E2E;
    &:focus {
      outline: 0;
      border-color: #000000;
    }
  }
  input[type='submit'] {
    background: #FF4949;
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 0.5rem 1.2rem;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
    }
  }
`;

export const VatForm = (): ReactElement => {
  return (
    <Form id="vatForm">
      <label htmlFor="nip">NIP number</label>
      <input
        type="text"
        name="nip"
        id="nip"
      />
      <input type="submit" value="Check NIP" />
    </Form>
  )
};