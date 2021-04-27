import { 
  FETCH_VAT_STARTED,
  FETCH_VAT_SUCCEEDED,
  FETCH_VAT_FAILED,
  FetchState,
  Action } from './types';

export const fetchState: FetchState = {
  error: null,
  isLoading: false,
  status: '',
  company: '',
  prevCompany: []
};

export const reducer = (state = fetchState, action: Action): FetchState => {
  const { type, payload } = action;

  switch (type) {
    case FETCH_VAT_STARTED: {
      return {
        ...state,
        isLoading: true,
        status: 'STARTED'
      };
    }
    case FETCH_VAT_SUCCEEDED: {
      return {
        ...state,
        isLoading: false,
        status: 'SUCCESSFUL',
        company: payload.company,
        prevCompany: [payload.company, ...state.prevCompany],
      };
    }
    case FETCH_VAT_FAILED: {
      return {
        ...state,
        isLoading: false,
        status: 'FAILED',
        error: payload.error
      };
    }
    default: {
      return state;
    }
  }
};

export type FetchedState = ReturnType<typeof reducer>