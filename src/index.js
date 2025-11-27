import React from 'react';
import { createRoot } from 'react-dom/client';
import './css/index.css';
import './css/main.css';
import App from './components/App';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
