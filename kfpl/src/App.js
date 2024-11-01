import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        {/* <header className="bg-blue-600 text-white p-4 shadow-lg">
          <nav className="flex justify-between">
            <Link to="/" className="font-bold text-xl">Maintenance Dashboard</Link>
            <Link to="/maintenance" className="text-sm bg-white text-blue-600 py-1 px-3 rounded-md">Add/Update Maintenance</Link>
          </nav>
        </header> */}
        <main className="p-4">
          <AppRoutes />
        </main>
      </div>
    </Router>
  );
}

export default App;
