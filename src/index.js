import React from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.js';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-social/bootstrap-social.css';



const root = document.getElementById('root');
const rootElement = createRoot(root);
rootElement.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);