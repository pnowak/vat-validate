import React, { ReactElement } from 'react';
import { VATAttributes } from './types';

type Props = {
  vat: VATAttributes
};

export const Company = ({ vat }: Props): ReactElement => {
  return (
    <>
      <h2>{`Valid - ${vat.valid}`}</h2>
      <p>{`Nazwa firmy: ${vat.company_name}`}</p>
      <p>{`Adress firmy: ${vat.company_address}`}</p>
    </>
  );
}