import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { UserProvider } from './contexts/UserContext';
import { Web3ContextProvider } from './contexts/Web3Context';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Web3ContextProvider>
      <UserProvider>
        <App />
      </UserProvider>
    </Web3ContextProvider>
  </React.StrictMode>,
);
