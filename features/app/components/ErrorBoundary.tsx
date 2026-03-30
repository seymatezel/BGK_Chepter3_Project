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
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-red-50 p-6">
          <div className="max-w-md w-full bg-white p-8 rounded-3xl shadow-2xl border-4 border-red-200 text-center space-y-6">
            <div className="text-6xl">⚠️</div>
            <h1 className="text-3xl font-black text-red-600">Bir Hata Oluştu</h1>
            <p className="text-xl text-gray-600">
              Uygulama beklenmedik bir sorunla karşılaştı. Lütfen sayfayı yenilemeyi deneyin.
            </p>
            <button
              onClick={() => window.location.reload()}
              className="w-full py-4 bg-red-600 text-white rounded-2xl font-bold text-xl hover:bg-red-700 transition-colors"
            >
              Sayfayı Yenile
            </button>
          </div>
        </div>
      );
    }

    return (this as any).props.children;
  }
}
