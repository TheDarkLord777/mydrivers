import React from 'react';

interface ErrorFallbackProps {
  error?: Error;
  resetErrorBoundary?: () => void;
}

const ErrorFallback: React.FC<ErrorFallbackProps> = ({ 
  error, 
  resetErrorBoundary 
}) => {
  return (
    <div className="error-fallback flex flex-col items-center justify-center min-h-screen bg-red-50 p-4">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h1 className="text-2xl font-bold text-red-600 mb-4">
          Something went wrong
        </h1>
        <pre className="text-sm text-gray-700 mb-4 overflow-auto max-h-40">
          {error?.message}
        </pre>
        <div className="flex space-x-4 justify-center">
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Reload Application
          </button>
          {resetErrorBoundary && (
            <button 
              onClick={resetErrorBoundary}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Try Again
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ErrorFallback;