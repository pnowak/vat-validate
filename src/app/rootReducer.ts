import { combineReducers } from 'redux';
import { reducer as vatReducer } from '../features/vatform/reducer';

export const rootReducer = combineReducers({
  error: vatReducer,
  isLoading: vatReducer,
  status: vatReducer,
  vat: vatReducer,
})

export type RootState = ReturnType<typeof rootReducer>