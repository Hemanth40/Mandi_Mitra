import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navigation = () => {
  const location = useLocation();

  const navLinks = [
    { to: '/', label: 'Home', icon: 'fas fa-home' },
    { to: '/prices', label: 'Mandi Prices', icon: 'fas fa-chart-line' },
    { to: '/weather', label: 'Weather', icon: 'fas fa-cloud-sun' },
    { to: '/crop-doctor', label: 'Crop Doctor', icon: 'fas fa-seedling' },
    { to: '/news', label: 'Agri News', icon: 'fas fa-newspaper' },
    { to: '/schemes', label: 'Gov Schemes', icon: 'fas fa-gavel' },
  ];

  return (
    <header className="bg-black/40 backdrop-blur-xl border border-white/10 rounded-full sticky top-4 z-50 mx-auto max-w-6xl shadow-2xl px-4 py-2 my-2">
      <div className="px-3 py-1 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2 text-white hover:text-amber-300 transition">
          <i className="fas fa-handshake text-amber-400 text-xl"></i>
          <h1 className="text-lg font-bold tracking-wide">Mandi Mitra</h1>
        </Link>
        <nav className="flex items-center space-x-1 sm:space-x-2">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.to;
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition flex items-center space-x-1 ${
                  isActive
                    ? 'bg-gradient-to-r from-amber-500 to-orange-600 text-white shadow-md'
                    : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                <i className={`${link.icon} mr-1`}></i>
                <span className="hidden md:inline">{link.label}</span>
                <span className="md:hidden">{link.label.split(' ')[0]}</span>
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;

