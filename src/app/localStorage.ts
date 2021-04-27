import { FetchedState } from '../features/vatform/reducer';
// export const save = (store: { getState: () => { (): any; new(): any; vat: any; }; }) => (next: (arg0: any) => any) => (action: any) => {
//   const result = next(action);

//   localStorage.setItem(
//     'applicationState',
//     JSON.stringify(store.getState().company)
//   );

//   return result;
// };

// export const load = () => {
//   const serializedState = localStorage.getItem('applicationState');

//   if (serializedState && serializedState !== null) {
//     return JSON.parse(serializedState);
//   }
// };

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');

    if (serializedState === null) {
      return undefined;
    }

    return JSON.parse(serializedState);

  } catch (err) {
    return undefined;
  }
};

export const saveState = (state: FetchedState) => {
  try {
    const serializedState = JSON.stringify(state);

    localStorage.setItem('state', serializedState);
  } catch (err) {
    // Ignore write errors.
  }
};