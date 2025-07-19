import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Header from './components/Header';
import Hero from './components/Hero';
import Features from './components/Features';
import UseCases from './components/UseCases';
import Services from './components/Services';
import About from './components/About';
import Testimonials from './components/Testimonials';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';
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
    <div className="relative bg-black">
      <Header />
      <Hero />
      <Features />
      <UseCases />
      <Services />
      <About />
      <Projects />
      <Skills />
      <Certifications />
      <Testimonials />
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
          <div className="min-h-screen bg-black">
            <Toaster position="top-right" />
            <Routes>
              <Route path="/" element={<Portfolio />} />
              <Route path="/admin/*" element={
                <ProtectedRoute>
                  <AdminRoutes />
                </ProtectedRoute>
              } />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;