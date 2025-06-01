import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../src/AuthContext';

const Login = () => {
  const [formData, setFormData] = React.useState({
    email: '',
    password: '',
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      console.log('Login response data:', data);
      if (response.ok) {
        toast.success('Login successful!');
        login(data.token);
        navigate('/');
      } else {
        toast.error(data.message || 'Login failed');
      }
    } catch (error) {
      toast.error('Error connecting to the server');
    }
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
            <Link to="/prices" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-chart-line mr-1"></i> Market Prices
            </Link>
            <Link to="/weather" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-cloud-sun mr-1"></i> Weather
            </Link>
            <Link to="/crop-doctor" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-seedling mr-1"></i> Crop Doctor
            </Link>
            <Link to="/news" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-newspaper mr-1"></i> News
            </Link>
            <Link to="/schemes" className="flex items-center hover:text-amber-200 transition font-medium text-base">
              <i className="fas fa-gavel mr-1"></i> Schemes
            </Link>
            <Link to="/login" className="flex items-center bg-amber-600 text-white px-4 py-1.5 rounded-full hover:bg-amber-700 transition font-medium shadow-md text-base">
              <i className="fas fa-sign-in-alt mr-1"></i> Login
            </Link>
          </nav>
        </div>
      </header>

      {/* Login Form Section */}
      <section className="flex items-center justify-center min-h-[80vh] w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mt-8">
        <div className="bg-white/20 backdrop-blur-2xl border border-white/30 p-8 rounded-xl shadow-xl w-full max-w-3xl flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-8 text-amber-900 font-serif">
          <div className="w-full md:w-1/2">
            <h1 className="text-3xl font-bold text-amber-800 mb-6 text-center font-serif">Farmer Login</h1>
            <form className="space-y-4" onSubmit={handleSubmit}>
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
                <label className="block text-gray-700 mb-2">Password</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
                  placeholder="Enter your password"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-amber-600 text-white py-3 px-4 rounded-lg hover:bg-amber-700 transition font-medium"
              >
                Login
              </button>
              <button
                type="button"
                className="w-full mt-4 flex items-center justify-center space-x-2 border border-gray-300 rounded-lg py-3 hover:bg-gray-100 transition"
                onClick={() => alert('Google login dummy button clicked')}
              >
                <i className="fab fa-google text-red-600 text-lg"></i>
                <span className="text-gray-700 font-medium">Login with Google</span>
              </button>
              <p className="text-center text-gray-600 mt-4">
                New user? <Link to="/signup" className="text-amber-700 hover:underline">Create account</Link>
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

export default Login;
