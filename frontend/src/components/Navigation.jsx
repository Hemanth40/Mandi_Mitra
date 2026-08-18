import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: '/', label: 'Home', icon: 'fas fa-home' },
    { to: '/prices', label: 'Mandi Prices', icon: 'fas fa-chart-line' },
    { to: '/weather', label: 'Weather', icon: 'fas fa-cloud-sun' },
    { to: '/crop-doctor', label: 'AI Crop Doctor', icon: 'fas fa-microscope' },
    { to: '/news', label: 'Agri News', icon: 'fas fa-newspaper' },
    { to: '/schemes', label: 'Gov Schemes', icon: 'fas fa-gavel' },
  ];

  return (
    <header className="sticky top-3 z-50 mx-auto max-w-6xl px-4 my-2">
      <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-700/70 rounded-2xl md:rounded-full px-5 py-2.5 shadow-2xl flex justify-between items-center">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center space-x-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20 group-hover:scale-105 transition-transform">
            <i className="fas fa-seedling text-lg"></i>
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-lg font-extrabold text-white tracking-tight">Mandi</span>
              <span className="text-lg font-extrabold text-emerald-400 tracking-tight">Mitra</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </div>
            <p className="text-[10px] text-slate-400 font-medium hidden sm:block leading-none">Smart Agriculture Hub</p>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center space-x-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center space-x-1.5 ${
                  isActive
                    ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 shadow-sm shadow-emerald-500/10'
                    : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
                }`}
              >
                <i className={`${link.icon} text-xs ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Mobile Hamburger Toggle Button */}
        <div className="lg:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-slate-300 hover:text-white p-2 rounded-xl bg-slate-800/80 border border-slate-700 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            <i className={`fas ${mobileMenuOpen ? 'fa-times' : 'fa-bars'} text-lg`}></i>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-2 bg-slate-900/95 backdrop-blur-2xl border border-slate-700/80 rounded-2xl p-4 shadow-2xl animate-fadeIn">
          <div className="grid grid-cols-2 gap-2">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.to;
              return (
                <Link
                  key={link.to}
                  to={link.to}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-3 rounded-xl text-xs font-semibold flex items-center space-x-2.5 transition ${
                    isActive
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                      : 'bg-slate-800/50 text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <i className={`${link.icon} text-sm ${isActive ? 'text-emerald-400' : 'text-slate-400'}`}></i>
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navigation;
