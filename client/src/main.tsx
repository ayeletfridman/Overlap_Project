import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import {  QueryClientProvider } from '@tanstack/react-query'
import { RecoilRoot } from 'recoil'
import App from './App'
import { Toaster } from 'react-hot-toast';
import { queryClient } from './lib/queryClient' 
import { ErrorFallback } from './components/ErrorFallback'
import { ErrorBoundary } from 'react-error-boundary'


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary 
      FallbackComponent={ErrorFallback} 
      onReset={() => queryClient.resetQueries()}
    >
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <Toaster position="top-center" reverseOrder={false} />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </QueryClientProvider>
      </RecoilRoot>
    </ErrorBoundary>
  </React.StrictMode>,
)