import React from 'react';
import './styles/App.css';
import Applications from './components/Applications';
import { Route, Routes, Navigate } from 'react-router-dom';
import ApplicationForm from './components/applicationForm/ApplicationForm';

const App = () => {
  return (
    <Routes>
      <Route path="/apply" element={<ApplicationForm />} />
      <Route path="/applications/:applicationId" element={<ApplicationForm />} />
      <Route path="/" element={<Navigate to="/applications" />} />
      <Route path="/applications" element={<Applications />} />
    </Routes>);
};

export default App;
