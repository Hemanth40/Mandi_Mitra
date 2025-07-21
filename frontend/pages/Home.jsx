import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthContext } from '../src/AuthContext';
import Navigation from '../src/components/Navigation';

const Home = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const features = [
    {
      title: "Real-time Market Prices",
      description: "Access live commodity prices from markets across India with historical trends and analysis.",
      icon: "fas fa-chart-line",
      link: "/prices",
      color: "from-emerald-500 to-teal-600"
    },
    {
      title: "AI Crop Doctor",
      description: "Upload photos of your crops to get instant disease diagnosis and treatment recommendations.",
      icon: "fas fa-microscope",
      link: "/crop-doctor",
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Weather Forecast",
      description: "Get accurate weather predictions and alerts for your farming region.",
      icon: "fas fa-cloud-sun",
      link: "/weather",
      color: "from-blue-500 to-indigo-600"
    },
    {
      title: "Agricultural News",
      description: "Latest updates on farming techniques, market trends, and government policies.",
      icon: "fas fa-newspaper",
      link: "/news",
      color: "from-purple-500 to-pink-600"
    },
    {
      title: "Government Schemes",
      description: "Information about subsidies, loans, and other government agricultural schemes.",
      icon: "fas fa-gavel",
      link: "/schemes",
      color: "from-rose-500 to-red-600"
    },
    {
      title: "Expert Advisory",
      description: "Get personalized farming advice from agricultural experts and consultants.",
      icon: "fas fa-user-tie",
      link: "/advisor",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      location: "Punjab",
      role: "Wheat Farmer",
      content: "Mandi Mitra helped me get 20% better prices for my wheat crop by showing me the best markets to sell in.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Priya Sharma",
      location: "Maharashtra",
      role: "Tomato Grower",
      content: "The crop doctor feature saved my entire tomato harvest from a fungal infection I didn't even know about.",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Amit Patel",
      location: "Gujarat",
      role: "Cotton Farmer",
      content: "The weather forecasts are incredibly accurate and have helped me plan my irrigation perfectly.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    }
  ];

  const stats = [
    { number: "50K+", label: "Active Farmers", icon: "fas fa-users" },
    { number: "500+", label: "Markets Covered", icon: "fas fa-store" },
    { number: "95%", label: "Accuracy Rate", icon: "fas fa-bullseye" },
    { number: "24/7", label: "Support Available", icon: "fas fa-clock" }
  ];

  return (
    <div className="min-h-screen">
      {/* Modern Navigation */}
      <Navigation />

      {/* Hero Section - Modern Design */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900 via-teal-800 to-amber-700"></div>
        <div className="absolute inset-0 bg-black/20"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-8">
            <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white/90 text-sm font-medium mb-4">
              🌾 Trusted by 50,000+ Farmers Across India
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Empowering India's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-orange-400">
              Farmers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-8 leading-relaxed">
            Advanced AI-powered tools and real-time market data to maximize your agricultural productivity and profits
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/signup" 
                  className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Get Started Free
                </Link>
                <Link 
                  to="/login" 
                  className="bg-white/20 backdrop-blur-sm text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/30 hover:bg-white/30 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link 
                to="/prices" 
                className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Explore Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
                <i className={`${stat.icon} text-2xl text-emerald-500 mt-4`}></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600"> Succeed</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive agricultural solutions powered by cutting-edge technology
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-8">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{feature.description}</p>
                    <Link 
                      to={feature.link} 
                      className="inline-flex items-center text-emerald-600 font-semibold hover:text-emerald-700 transition-colors"
                    >
                      Explore Now
                      <i className="fas fa-arrow-right ml-2 group-hover:translate-x-1 transition-transform duration-300"></i>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - Modern Design */}
      <section className="py-20 bg-gradient-to-br from-emerald-50 via-white to-amber-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Trusted by <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-600 to-orange-600">Farmers</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from farmers who transformed their agricultural practices
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300">
                <div className="flex items-center mb-6">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-emerald-100"
                  />
                  <div>
                    <h4 className="font-bold text-gray-900 text-lg">{testimonial.name}</h4>
                    <p className="text-emerald-600 font-medium">{testimonial.role}</p>
                    <p className="text-gray-500 text-sm">{testimonial.location}</p>
                  </div>
                </div>
                <div className="relative">
                  <i className="fas fa-quote-left text-emerald-200 text-2xl absolute -top-2 -left-2"></i>
                  <p className="text-gray-700 italic leading-relaxed pl-4">{testimonial.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Modern Design */}
      <section className="py-20 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from Mandi Mitra's premium features.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {!isAuthenticated ? (
              <>
                <Link 
                  to="/signup" 
                  className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
                >
                  Start Free Trial
                </Link>
                <Link 
                  to="/login" 
                  className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-600 transition-all duration-300"
                >
                  Sign In
                </Link>
              </>
            ) : (
              <Link 
                to="/prices" 
                className="bg-white text-emerald-600 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
              >
                Access Dashboard
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Footer - Modern Design */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <i className="fas fa-handshake text-emerald-400 text-2xl"></i>
                <h3 className="text-2xl font-bold">Mandi Mitra</h3>
              </div>
              <p className="text-gray-400 mb-4">
                Empowering farmers with technology and data-driven insights for better agricultural outcomes.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <i className="fab fa-facebook"></i>
                </a>
                <a href="#" className="text-gray-400 hover:text-emerald-400 transition">
                  <i className="fab fa-linkedin"></i>
                </a>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Features</h4>
              <ul className="space-y-2 text-gray-400">
                <li><Link to="/prices" className="hover:text-emerald-400 transition">Market Prices</Link></li>
                <li><Link to="/weather" className="hover:text-emerald-400 transition">Weather Forecast</Link></li>
                <li><Link to="/crop-doctor" className="hover:text-emerald-400 transition">Crop Doctor</Link></li>
                <li><Link to="/news" className="hover:text-emerald-400 transition">Agricultural News</Link></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">Help Center</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Contact Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Documentation</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">API Reference</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-emerald-400 transition">About Us</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Careers</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-emerald-400 transition">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Mandi Mitra. All rights reserved. Built with ❤️ for Indian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
