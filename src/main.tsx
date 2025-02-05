import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { Component } from 'react';
import App from './App.tsx';
import './index.css';
import SignUpForm from './pages/signup.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <App /> */}
    <SignUpForm />
  </StrictMode>,
);
