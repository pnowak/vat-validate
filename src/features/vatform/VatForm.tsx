import React, { ReactElement, BaseSyntheticEvent, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { FetchedState } from '../vatform/reducer';
import { Company } from './Company';
import { FETCH_VAT_REQUEST } from './types';

const FormStyled = styled.form`
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
    cursor: pointer;
    &[disabled] {
      opacity: 0.5;
    }
  }
`;

const OutputStyled = styled.div`
  display: grid;
  align-content: start;
  align-items: start;
  justify-items: start;
  margin-bottom: 3rem;
`;

const PrevStyled = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(min-content, 330px));
  gap: 1rem;
  justify-content: center;
`;

export const VatForm = (): ReactElement => {
  const [nip, setNip] = useState('');
  const { company, prevCompany, status } = useSelector((state: FetchedState) => state);
  const dispatch = useDispatch();

  const resetForm = () => setNip('');

  const handleSubmit = (event: BaseSyntheticEvent) => {
    event.preventDefault();
    dispatch({
      type: FETCH_VAT_REQUEST,
      company: nip
    });

    resetForm();
  };

  const submitting = status === 'STARTED';

  return (
    <>
      <FormStyled id="vatForm" onSubmit={handleSubmit}>
        <label htmlFor="nip">Wprowadź numer NIP</label>
        <input
          type="text"
          name="nip"
          id="nip"
          value={nip}
          onChange={(e: React.FormEvent<HTMLInputElement>): void =>
            setNip((e.target as HTMLInputElement).value)
          }
        />
        <input type="submit" value="Sprawdź NIP" disabled={submitting} />
      </FormStyled>
      <OutputStyled id="output">
        {company && <Company company={company} />}
      </OutputStyled>
      <PrevStyled> 
        {
          prevCompany.map(c => (
            <Company key={c.query} company={c} />
          ))
        }
      </PrevStyled>
    </>
  )
};