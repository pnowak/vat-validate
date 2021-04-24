import { ReactElement, ReactNode } from 'react';
import ReactDOM from 'react-dom';

export type Element = (selector: string) => HTMLElement | null;
export type Elements = (selector: string) => HTMLElement[] | null;
export type Render = (component: ReactElement) => ReactNode;

export const createContainer = () => {
  const container = document.createElement('div');

  const element: Element = selector => container.querySelector(selector);
  const elements: Elements = selector => Array.from(container.querySelectorAll(selector));
  const render: Render = async component => ReactDOM.render(component, container);

  return {
    render,
    container,
    element,
    elements,
  };
};