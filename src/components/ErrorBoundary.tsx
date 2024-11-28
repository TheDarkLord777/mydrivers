// components/ErrorBoundary.tsx
import React, { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode; // Xatolik yuz berganda ko'rsatiladigan komponent
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    // Xatolik yuz berganda state ni yangilash
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Xatolikni logga yozish
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      // Xatolik yuz berganda ko'rsatiladigan UI
      return this.props.fallback || (
        <div className="error-boundary p-4 rounded-lg bg-red-50 border border-red-200">
          <h2 className="text-red-600 font-semibold mb-2">Xatolik yuz berdi</h2>
          <p className="text-red-500">
            {this.state.error?.message || 'Kutilmagan xatolik yuz berdi'}
          </p>
          <button
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
            onClick={() => window.location.reload()}
          >
            Sahifani qayta yuklash
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;