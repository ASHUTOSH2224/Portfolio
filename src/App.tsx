import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certifications from './components/Certifications';
import Contact from './components/Contact';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-matteBlack-800 text-white relative overflow-hidden">
      {/* Refined Background Elements */}
      <div className="fixed inset-0 matrix-bg opacity-40"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-80 h-80 bg-accent-secondary/4 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-tertiary/3 rounded-full blur-2xl animate-float delay-500"></div>
      </div>

      {/* Subtle grid pattern overlay */}
      <div className="fixed inset-0 opacity-[0.02] pointer-events-none" style={{
        backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
        backgroundSize: '50px 50px'
      }}></div>

      {/* Main Content */}
      <div className="relative z-10">
        <Header />
        <main>
          <Hero />
          <About />
          <Projects />
          <Skills />
          <Certifications />
          <Contact />
        </main>
        <Footer />
      </div>

      {/* Enhanced Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-surface-secondary z-50">
        <div className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary transform origin-left transition-transform duration-150"></div>
      </div>
    </div>
  );
}

export default App;