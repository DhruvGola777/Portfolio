import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Portfolio from './pages/Portfolio';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import CaseStudy from './pages/CaseStudy';
import { Toaster } from 'react-hot-toast';

import { checkAuth } from './api';

// A simple PrivateRoute wrapper
const PrivateRoute = ({ children, isAuthenticated, isCheckingAuth }) => {
  if (isCheckingAuth) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Checking authentication...</div>;
  }
  return isAuthenticated ? children : <Navigate to="/admin/login" />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = React.useState(true);

  useEffect(() => {
    // Force premium dark mode everywhere
    document.documentElement.classList.add('dark');
    
    // Check if the user has a valid HttpOnly cookie session
    const verifyAuth = async () => {
      try {
        await checkAuth();
        setIsAuthenticated(true);
      } catch (err) {
        setIsAuthenticated(false);
      } finally {
        setIsCheckingAuth(false);
      }
    };
    verifyAuth();
  }, []);

  return (
    <>
      <Toaster position="bottom-right" toastOptions={{ className: 'bg-black/90 text-white border border-white/10' }} />
      <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/project/:id" element={<CaseStudy />} />
        <Route path="/admin/login" element={<AdminLogin setIsAuthenticated={setIsAuthenticated} />} />
        <Route 
          path="/admin/dashboard" 
          element={
            <PrivateRoute isAuthenticated={isAuthenticated} isCheckingAuth={isCheckingAuth}>
              <AdminDashboard setIsAuthenticated={setIsAuthenticated} />
            </PrivateRoute>
          } 
        />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
    </>
  );
}

export default App;
