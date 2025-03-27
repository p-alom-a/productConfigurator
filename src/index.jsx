import './index.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import App from './App'; // Assuming App is your main component

// Create the root once and reuse it
const rootElement = document.querySelector('#root');
const root = createRoot(rootElement);

root.render(<App />);