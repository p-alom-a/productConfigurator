import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import IkeaProductPage from './IkeaProductPage.jsx';
import PersonnalisationPage from './PersonnalisationPage.jsx';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<IkeaProductPage />} />
        <Route path="/personnalisation" element={<PersonnalisationPage />} />
      </Routes>
    </Router>
  );
}
