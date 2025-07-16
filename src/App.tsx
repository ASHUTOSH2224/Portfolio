import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Services from './components/Services';
import analyticsService from './services/analyticsService';

// Admin imports
import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import UserAnalytics from './admin/pages/UserAnalytics';
import PortfolioManagement from './admin/pages/PortfolioManagement';
import ContactManagement from './admin/pages/ContactManagement';
import Login from './admin/pages/Login';

// Portfolio component
const Portfolio: React.FC = () => {
  return (
    <div className="relative">
      {/* Background Elements */}
      <div className="fixed inset-0 matrix-bg opacity-30 pointer-events-none"></div>
      <div className="fixed top-1/4 left-0 w-80 h-80 bg-accent-primary/3 rounded-full blur-3xl animate-float pointer-events-none"></div>
      <div className="fixed bottom-1/4 right-0 w-96 h-96 bg-accent-secondary/2 rounded-full blur-3xl animate-float delay-300 pointer-events-none"></div>
      
      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-border z-50">
        <div className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transition-all duration-300" style={{ width: '0%' }}></div>
      </div>

      <Header />
      <Hero />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      <Contact />
      <Footer />
    </div>
  );
};

// Admin Routes Component
const AdminRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public admin routes */}
      <Route path="/login" element={<Login />} />
      
      {/* Protected admin routes */}
      <Route 
        path="/" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <Dashboard />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/analytics" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <UserAnalytics />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/portfolio" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <PortfolioManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/contact" 
        element={
          <ProtectedRoute requireAdmin={true}>
            <AdminLayout>
              <ContactManagement />
            </AdminLayout>
          </ProtectedRoute>
        } 
      />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

// Create a query client
const queryClient = new QueryClient();

function App() {
  const getUserAgent = () => navigator.userAgent || 'Unknown';
  const getIpAddress = () => '127.0.0.1'; // For development, in production this should be handled by the server

  // Initialize analytics session
  const initSession = async () => {
    try {
      const sessionId = analyticsService.getSessionId();
      await analyticsService.trackPageView({
        sessionId,
        path: window.location.pathname,
        title: document.title || window.location.pathname,
        referrer: document.referrer || '',
        userAgent: getUserAgent(),
        ipAddress: getIpAddress()
      });
    } catch (error) {
      console.error('Failed to initialize analytics session:', error);
    }
  };

  // End analytics session
  const endSession = async () => {
    try {
      const sessionId = analyticsService.getSessionId();
      await analyticsService.trackEvent({
        sessionId,
        type: 'other',
        element: 'session_end',
        userAgent: getUserAgent(),
        ipAddress: getIpAddress()
      });
    } catch (error) {
      console.error('Failed to end analytics session:', error);
    }
  };

  useEffect(() => {
    initSession();
    return () => {
      endSession();
    };
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Toaster position="top-right" />
            <Header />
            <main>
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <About />
                    <Services />
                    <Projects />
                    <Skills />
                    <Certifications />
                    <Contact />
                  </>
                } />
                <Route path="/admin/*" element={
                  <ProtectedRoute>
                    <AdminRoutes />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;