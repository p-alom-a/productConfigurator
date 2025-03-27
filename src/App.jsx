import './style.css';
import { createRoot } from 'react-dom/client';
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IkeaProductPage from './IkeaProductPage.jsx';
import PersonnalisationPage from './PersonnalisationPage.jsx';

const root = createRoot(document.querySelector('#root'));

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IkeaProductPage />} />
        <Route path="/personnalisation" element={<PersonnalisationPage />} />
      </Routes>
    </Router>
  );
};

root.render(<App />);