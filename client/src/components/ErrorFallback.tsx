import React from 'react';

interface Props {
  error: Error;
  resetErrorBoundary: () => void;
}

export const ErrorFallback: React.FC<Props> = ({ error, resetErrorBoundary }) => {
  return (
    <div style={{ 
      display: 'flex', flexDirection: 'column', alignItems: 'center', 
      justifyContent: 'center', height: '100vh', textAlign: 'center', padding: '20px' 
    }}>
      <h2 style={{ color: '#d32f2f' }}>אופס! משהו השתבש </h2>
      <p style={{ margin: '10px 0', color: '#555' }}>{error.message}</p>
      <button 
        onClick={resetErrorBoundary}
        style={{
          padding: '10px 20px', backgroundColor: '#1976d2', color: 'white',
          border: 'none', borderRadius: '4px', cursor: 'pointer'
        }}
      >
        נסה שוב
      </button>
    </div>
  );
};