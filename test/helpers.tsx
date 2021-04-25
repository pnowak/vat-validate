import { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';
import { SyntheticEventData } from 'react-dom/test-utils';

export type Element = (selector: string) => HTMLElement | null;
export type Elements = (selector: string) => HTMLElement[] | null;
export type Render = (component: ReactElement) => ReactNode;
export type LabelFor = (formElement: string) => HTMLElement | null;
export type WithEvent = (name: string, value: string) => SyntheticEventData | undefined;

export const createContainer = () => {
  const container = document.createElement('div');

  const element: Element = selector => container.querySelector(selector);
  const elements: Elements = selector => Array.from(container.querySelectorAll(selector));
  const render: Render = async component => ReactDOM.render(component, container);
  const labelFor: LabelFor = formElement => container.querySelector(`label[for="${formElement}"]`);

  return {
    render,
    container,
    element,
    elements,
    labelFor
  };
};

export const withEvent: WithEvent = (name, value) => ({
  target: { name, value },
});