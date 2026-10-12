import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('VANGUARDBOOKSEARCH Uncaught UI Error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-stone-50 dark:bg-stone-950 text-stone-900 dark:text-stone-100 flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-800 rounded-2xl p-8 space-y-5 shadow-lg text-center">
            <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto text-xl font-bold font-editorial-serif">
              V
            </div>
            <h1 className="text-2xl font-bold font-editorial-serif text-stone-950 dark:text-stone-100">
              Vanguard Book Search
            </h1>
            <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
              An unexpected display issue occurred while initializing the view. Please refresh the page to reload the catalog architecture.
            </p>
            <div className="pt-2">
              <button
                onClick={() => window.location.reload()}
                className="px-5 py-2.5 text-xs font-semibold text-white bg-stone-900 hover:bg-stone-800 dark:bg-amber-600 dark:hover:bg-amber-700 rounded transition-colors shadow-sm cursor-pointer"
              >
                Reload Website
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
