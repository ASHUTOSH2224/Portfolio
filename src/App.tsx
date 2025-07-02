import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

// Admin imports
import AdminLayout from './admin/layout/AdminLayout';
import Dashboard from './admin/pages/Dashboard';
import UserAnalytics from './admin/pages/UserAnalytics';
import PortfolioManagement from './admin/pages/PortfolioManagement';
import ContactManagement from './admin/pages/ContactManagement';

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
      <Route path="/" element={<Dashboard />} />
      <Route path="/analytics" element={<UserAnalytics />} />
      <Route path="/portfolio" element={<PortfolioManagement />} />
      <Route path="/contact" element={<ContactManagement />} />
      <Route path="*" element={<Navigate to="/admin" replace />} />
    </Routes>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Portfolio Route */}
        <Route path="/" element={<Portfolio />} />
        
        {/* Admin Routes */}
        <Route path="/admin/*" element={<AdminRoutes />} />
        
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;