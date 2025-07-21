import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Navigation = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-black/30 backdrop-blur-lg border border-white/20 rounded-full sticky top-4 z-50 mx-auto max-w-6xl shadow-2xl">
      <div className="px-6 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-3">
          <i className="fas fa-handshake text-amber-400 text-xl"></i>
          <h1 className="text-lg font-bold text-white">Mandi Mitra</h1>
        </div>
        <nav className="flex items-center space-x-4">
          <Link to="/" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-home mr-1"></i> Home
          </Link>
          <Link to="/prices" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-chart-line mr-1"></i> Prices
          </Link>
          <Link to="/weather" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-cloud-sun mr-1"></i> Weather
          </Link>
          <Link to="/crop-doctor" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-seedling mr-1"></i> Doctor
          </Link>
          <Link to="/news" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-newspaper mr-1"></i> News
          </Link>
          <Link to="/schemes" className="text-white/80 hover:text-white transition font-medium text-sm">
            <i className="fas fa-gavel mr-1"></i> Schemes
          </Link>
          {isAuthenticated ? (
            <button
              onClick={handleLogout}
              className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm hover:bg-amber-600 transition font-medium"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="bg-amber-500 text-white px-3 py-1.5 rounded-full text-sm hover:bg-amber-600 transition font-medium">
              Login
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navigation;
