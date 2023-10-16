import React from 'react';
import ReactDOM from 'react-dom/client';
import '@astrouxds/astro-web-components/dist/astro-web-components/astro-web-components.css';
import './index.css';
import App from './App.tsx';

const root = ReactDOM.createRoot(document.getElementById('app'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
