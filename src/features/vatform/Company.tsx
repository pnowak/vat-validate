import React, { ReactElement } from 'react';
import { VATAttributes } from './types';

type Props = {
  company: VATAttributes
};

export const Company = ({ company }: Props): ReactElement => {
  return (
    <>
      <h2>{`Zapytanie o ${company.query}`}{' - '}{`${company.valid}`}</h2>
      <p>{`Nazwa firmy: ${company.company_name}`}</p>
      <p>{`Adress firmy: ${company.company_address}`}</p>
    </>
  );
}