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
    <div className="min-h-screen bg-matteBlack-500 text-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 matrix-bg opacity-50"></div>
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent-primary/5 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl animate-float delay-300"></div>
        <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-accent-secondary/5 rounded-full blur-2xl animate-float delay-500"></div>
      </div>

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

      {/* Scroll Progress Indicator */}
      <div className="fixed top-0 left-0 w-full h-1 bg-matteBlack-200 z-50">
        <div className="h-full bg-gradient-to-r from-accent-primary to-accent-purple transform origin-left transition-transform duration-150"></div>
      </div>
    </div>
  );
}

export default App;