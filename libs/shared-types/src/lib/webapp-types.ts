import { LazyExoticComponent } from 'react';

export interface Page {
  path: string;
  component: LazyExoticComponent<() => JSX.Element>;
  name: string;
}
