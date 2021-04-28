import React, { ReactElement } from 'react';
import { VATAttributes } from './types';
import styled from 'styled-components';

type Props = {
  company: VATAttributes
};

const CompanyStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  align-content: start;
  align-items: start;
  justify-items: start;
  margin: 1rem auto;
  padding: 0 1rem;
  background-color: #efefef;
  border: 1px solid #2E2E2E;
  border-radius: .4rem;
  font-size: 1rem;
  line-height: 1.1;
  font-weight: 500;
`;

export const Company = ({ company }: Props): ReactElement => {
  return (
    <CompanyStyled>
      <h2>{`Zapytanie o ${company.query}`}{' - '}{`${company.valid}`}</h2>
      <p>{`Nazwa firmy: ${company.company_name}`}</p>
      <p>{`Adres firmy: ${company.company_address}`}</p>
    </CompanyStyled>
  );
}