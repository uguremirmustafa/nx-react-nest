/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/destructuring-assignment */
import React, { Component, ReactNode } from 'react';

export class ErrorBoundary extends Component<
  { children: ReactNode },
  { hasError: boolean }
> {
  constructor(
    props: { children: ReactNode } | Readonly<{ children: ReactNode }>
  ) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_error: any): { hasError: boolean } {
    return { hasError: true };
  }

  override componentDidCatch(error: any, errorInfo: any): void {
    // TODO: Send error to the backend, maybe?
    console.log(error, errorInfo);
  }

  override render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
