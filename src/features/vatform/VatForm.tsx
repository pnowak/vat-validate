import React, { ReactElement } from 'react';

export const VatForm = (): ReactElement => {
  return (
    <form id="vatForm">
      <input
        type="text"
        name="nip"
        id="nip"
      />
      <input type="submit" value="Check VAT" />
    </form>
  )
};