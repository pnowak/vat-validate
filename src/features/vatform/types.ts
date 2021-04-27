export const FETCH_VAT_REQUEST = 'FETCH_VAT_REQUEST';
export const FETCH_VAT_STARTED = 'FETCH_VAT_STARTED';
export const FETCH_VAT_SUCCEEDED = 'FETCH_VAT_SUCCEEDED';
export const FETCH_VAT_FAILED = 'FETCH_VAT_FAILED';

export interface VATAttributes {
    query: string;
    valid: boolean,
    company_name: string,
    company_address: string,
}

export type FetchState = {
    error: null | string,
    isLoading: boolean,
    status: 'STARTED' | 'SUCCESSFUL'| 'FAILED' | '',
    company: VATAttributes | '',
    prevCompany: VATAttributes[]
};

export type Action =  {
    type: typeof FETCH_VAT_STARTED | typeof FETCH_VAT_SUCCEEDED | typeof FETCH_VAT_FAILED;
    status: string,
    isLoading: boolean,
    payload: { 
        company: VATAttributes,
        prevCompany: VATAttributes[]
        error: string
    }
};