import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import RecaptchaProvider from './context/RecaptchaProvider.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RecaptchaProvider>
      <App />
    </RecaptchaProvider>
  </StrictMode>
);
