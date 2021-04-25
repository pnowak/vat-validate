import React, { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { SyntheticEventData, act } from 'react-dom/test-utils';
import { Provider } from 'react-redux';
import { storeSpy } from 'expect-redux';
import { configureStore } from '../src/app/store';

export type Element = (selector: string) => HTMLElement | null;
export type Elements = (selector: string) => HTMLElement[] | null;
export type Render = (component: ReactElement) => ReactNode;
export type LabelFor = (formElement: string) => HTMLElement | null;
export type WithEvent = (name: string, value: string) => SyntheticEventData | undefined;
export type Form = (id: string) => HTMLElement | null;

export const createContainer = () => {
  const container = document.createElement('div');

  const element: Element = selector => container.querySelector(selector);
  const elements: Elements = selector => Array.from(container.querySelectorAll(selector));
  const render: Render = async component => ReactDOM.render(component, container);
  const labelFor: LabelFor = formElement => container.querySelector(`label[for="${formElement}"]`);
  const form: Form = (id: string) => container.querySelector(`form[id="${id}"]`);

  return {
    render,
    container,
    element,
    elements,
    labelFor,
    form
  };
};

export const createContainerWithStore = () => {
  const store = configureStore([storeSpy]);
  const container = createContainer();

  return {
    ...container,
    store,
    renderWithStore: (component: React.ReactNode) => {
      act(() => {
        ReactDOM.render(
          <Provider store={store}>{component}</Provider>,
          container.container
        );
      });
    }
  }
};

export const withEvent: WithEvent = (name, value) => ({
  target: { name, value },
});