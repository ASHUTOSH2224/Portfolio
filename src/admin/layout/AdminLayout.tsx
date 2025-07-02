import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Home, 
  Settings, 
  Briefcase, 
  Mail, 
  HelpCircle,
  ChevronLeft,
  Bell,
  Search,
  LogOut
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
  currentPage?: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, currentPage }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();

  const navigationItems = [
    { icon: Home, label: 'Dashboard', href: '/admin', active: location.pathname === '/admin' },
    { icon: Settings, label: 'Analytics', href: '/admin/analytics', active: location.pathname === '/admin/analytics' },
    { icon: Briefcase, label: 'Portfolio', href: '/admin/portfolio', active: location.pathname === '/admin/portfolio' },
    { icon: Mail, label: 'Contact', href: '/admin/contact', active: location.pathname === '/admin/contact' },
  ];

  // Auto-detect current page from route if not provided
  const getPageTitle = () => {
    if (currentPage) return currentPage;
    
    switch (location.pathname) {
      case '/admin':
        return 'Service Inquiries Dashboard';
      case '/admin/analytics':
        return 'User Analytics';
      case '/admin/portfolio':
        return 'Portfolio Management';
      case '/admin/contact':
        return 'Contact Management';
      default:
        return 'Dashboard';
    }
  };

  const scrollToSection = (sectionId: string) => {
    // For portfolio navigation - redirect to main site
    window.location.href = `/#${sectionId}`;
  };

  return (
    <div className="min-h-screen bg-matteBlack-800 flex">
      {/* Sidebar */}
      <div className={`${sidebarCollapsed ? 'w-16' : 'w-64'} bg-surface-secondary border-r border-surface-border transition-all duration-300 flex flex-col`}>
        {/* Header */}
        <div className="p-6 border-b border-surface-border">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <Link to="/" className="text-xl font-bold tracking-wider text-text-primary hover:text-accent-primary transition-colors duration-300">
                Portfolio Admin
              </Link>
            )}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow"
            >
              <ChevronLeft className={`w-4 h-4 transition-transform duration-300 ${sidebarCollapsed ? 'rotate-180' : ''}`} />
            </button>
          </div>
          {!sidebarCollapsed && (
            <div className="mt-2 px-3 py-1 bg-matteBlack-800 rounded-lg text-xs text-text-muted border border-surface-border">
              Admin Panel
            </div>
          )}
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item, index) => (
            <Link
              key={index}
              to={item.href}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
                item.active 
                  ? 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20' 
                  : 'text-text-muted hover:text-accent-primary hover:bg-surface-tertiary'
              }`}
            >
              <item.icon className={`w-5 h-5 ${item.active ? 'text-accent-primary' : 'text-text-muted group-hover:text-accent-primary'}`} />
              {!sidebarCollapsed && (
                <span className="font-medium">{item.label}</span>
              )}
            </Link>
          ))}
        </nav>

        {/* Portfolio Link */}
        <div className="p-4 border-t border-surface-border">
          <Link
            to="/"
            className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group text-text-muted hover:text-accent-secondary hover:bg-surface-tertiary"
          >
            <HelpCircle className="w-5 h-5 text-text-muted group-hover:text-accent-secondary" />
            {!sidebarCollapsed && (
              <span className="font-medium">View Portfolio</span>
            )}
          </Link>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="bg-surface-secondary border-b border-surface-border px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-text-primary">
              {getPageTitle()}
            </h1>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 glass-effect border border-surface-border rounded-lg text-text-primary placeholder-text-muted focus:border-accent-primary focus:ring-1 focus:ring-accent-primary/50 transition-all duration-300 w-64"
                />
              </div>

              {/* Notifications */}
              <button className="relative p-2 text-text-muted hover:text-accent-primary transition-colors duration-200 glass-effect rounded-lg hover-glow">
                <Bell className="w-5 h-5" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-accent-primary rounded-full"></div>
              </button>

              {/* User Menu */}
              <div className="flex items-center space-x-3">
                <div className="text-right">
                  <div className="text-sm text-text-primary font-medium">Welcome, admin!</div>
                </div>
                <div className="w-8 h-8 bg-gradient-to-r from-accent-primary to-accent-secondary rounded-full flex items-center justify-center text-matteBlack-800 font-bold">
                  A
                </div>
                <Link
                  to="/"
                  className="p-2 text-text-muted hover:text-red-400 transition-colors duration-200 glass-effect rounded-lg hover-glow"
                  title="Logout to Portfolio"
                >
                  <LogOut className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </header>

        {/* Content Area */}
        <main className="flex-1 p-6 bg-matteBlack-800">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout; 