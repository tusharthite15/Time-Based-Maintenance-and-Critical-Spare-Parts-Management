import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './components/dashboard';
import AddOrUpdateMaintenance from './components/AddOrUpdateMaintenance';

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/maintenance" element={<AddOrUpdateMaintenance />} />
    </Routes>
  );
};

export default AppRoutes;
