import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import Home from './pages/Home';
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <BrowserRouter>
      <AppProvider>
        <Routes>
          {/* Landing page is now the root URL */}
          <Route path="/" element={<LandingPage />} />
          {/* Chat app lives at /app */}
          <Route path="/app" element={<Home />} />
          {/* Catch-all redirects to landing */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppProvider>
    </BrowserRouter>
  );
}

export default App;
