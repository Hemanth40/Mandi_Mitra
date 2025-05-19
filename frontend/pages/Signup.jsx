import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Signup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState({
    fullName: '',
    email: '',
    mobile: '',
    password: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        fullName: formData.fullName,
        email: formData.email,
        mobile: formData.mobile,
        password: formData.password,
      };
      const response = await fetch('http://localhost:5000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      if (response.ok) {
        toast.success('Signup successful! You can now log in.');
        navigate('/login');
      } else {
        toast.error(data.message || 'Signup failed');
      }
    } catch (error) {
      toast.error('Error connecting to the server');
    }
  };

  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div className="min-h-screen w-full bg-amber-100 m-0 p-0">
      <ToastContainer />
      {/* Sticky Navigation Bar */}
      <header className="bg-white/30 backdrop-blur-lg rounded-full p-2 shadow-lg sticky top-0 z-50 max-w-5xl mx-auto px-2 mt-2">
        <div className="px-2 sm:px-4 lg:px-6 flex justify-between items-center min-h-0">
          <div className="flex items-center space-x-1">
            <i className="fas fa-handshake text-amber-700 h-8 w-8 text-2xl"></i>
            <h1 className="text-2xl font-bold font-serif text-amber-900">Mandi Mitra</h1>
          </div>
          <nav className="flex space-x-5 items-center">
            <a href="/prices" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-chart-line mr-1"></i> Market Prices
            </a>
            <a href="/weather" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-cloud-sun mr-1"></i> Weather
            </a>
            <a href="/crop-doctor" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-seedling mr-1"></i> Crop Doctor
            </a>
            <a href="/news" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-newspaper mr-1"></i> News
            </a>
            <a href="/schemes" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-gavel mr-1"></i> Schemes
            </a>
              <a href="/login" className="flex items-center bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition font-medium shadow-md text-base">
                <i className="fas fa-sign-in-alt mr-1"></i> Login
              </a>
          </nav>
        </div>
      </header>
      {/* Signup Form Section */}
      <section className="flex items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 text-amber-900 font-serif">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center font-serif">Create Account</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 mb-2">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your full name"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your email address"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter 10-digit mobile number"
                  required
                />
              </div>
              <div>
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Create a password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition font-medium"
              >
                Sign Up
              </button>
              <button
                type="button"
                className="w-full mt-4 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition"
                onClick={() => alert('Google signup dummy button clicked')}
              >
                <i className="fab fa-google text-red-600 text-lg"></i>
                <span className="text-gray-700 font-medium">Sign up with Google</span>
              </button>
              <p className="text-center text-gray-600 mt-4">
                Already have an account? <Link to="/login" className="text-amber-700 hover:underline">Login</Link>
              </p>
            </form>
          </div>
          <div className="w-full md:w-1/2 border-l border-black/70 pl-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center space-x-2">
              <i className="fas fa-handshake text-amber-700 text-3xl"></i>
              <span>Why Join Mandi Mitra?</span>
            </h2>
            <ul className="space-y-4 text-lg">
              <li className="flex items-center space-x-3">
                <i className="fas fa-chart-line text-amber-600 text-xl"></i>
                <span>Access real-time market prices and trends</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-seedling text-amber-600 text-xl"></i>
                <span>Get AI-powered crop disease diagnosis</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-cloud-sun text-amber-600 text-xl"></i>
                <span>Receive accurate weather forecasts</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-newspaper text-amber-600 text-xl"></i>
                <span>Stay updated with the latest agricultural news</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-gavel text-amber-600 text-xl"></i>
                <span>Learn about government schemes and subsidies</span>
              </li>
              <li className="flex items-center space-x-3">
                <i className="fas fa-user-tie text-amber-600 text-xl"></i>
                <span>Consult expert advisors for personalized help</span>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Signup;
