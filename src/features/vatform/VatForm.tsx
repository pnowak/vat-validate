import React, { ReactElement, BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { RootState } from '../../app/rootReducer';
import { FETCH_VAT_REQUEST, VATAttributes } from './types';

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
    border-radius: .4rem;
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

const Output = styled.div`
  display: grid;
  align-content: start;
  align-items: start;
  justify-items: start;
  margin: 3rem auto;
  padding: 0 1rem;
  width: 50%;
  background-color: #efefef;
  border: 1px solid #2E2E2E;
  border-radius: .4rem;
  font-size: 1rem;
  line-height: 1.1;
  font-weight: 500;
`;

type Props = {
  vat: VATAttributes
};

export const Company = ({ vat }: Props): ReactElement => {
  return (
    <div>
      <h2>{`Valid - ${vat.valid}`}</h2>
      <p>{`Nazwa firmy: ${vat.company_name}`}</p>
      <p>{`Adress firmy: ${vat.company_address}`}</p>
    </div>
  );
}

export const VatForm = (): ReactElement => {
  const [nip, setNip] = useState('');
  const { vat } = useSelector((state: RootState) => state.vat);
  const dispatch = useDispatch();

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch({
      type: FETCH_VAT_REQUEST,
      vat: nip
    });
  };

  const submitting = status === 'SUBMITTING';

  return (
    <>
      <Form id="vatForm" onSubmit={handleSubmit}>
        <label htmlFor="nip">NIP number</label>
        <input
          type="text"
          name="nip"
          id="nip"
          value={nip}
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setNip((e.target as HTMLInputElement).value)
          }
        />
        <input type="submit" value="Check NIP" disabled={submitting} />
      </Form>
      <Output id="output">
        {vat && <Company vat={vat} />}
      </Output>
    </>
  )
};