import React from 'react';
import { Link } from 'react-router-dom';
import "../src/index.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Navigation from '../src/components/Navigation';

const Home = () => {
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
      title: "Crop Health Diagnosis",
      description: "Analyze plant health, identify insect pests, and detect mushroom species with AI.",
      icon: "fas fa-leaf",
      link: "/crop-doctor",
      color: "from-cyan-500 to-blue-600"
    }
  ];

  const highlights = [
    {
      icon: "fas fa-bolt",
      title: "Zero Friction Access",
      description: "No accounts, no passwords, and no subscription barriers. Direct access to all tools instantly."
    },
    {
      icon: "fas fa-satellite",
      title: "Open Data Integrity",
      description: "Direct real-time integration with National Data Portal (data.gov.in) and Open-Meteo satellites."
    },
    {
      icon: "fas fa-brain",
      title: "AI Computer Vision",
      description: "Deep learning models capable of identifying crop diseases, pests, and giving verified remedies."
    }
  ];

  const stats = [
    { number: "500+", label: "Mandis Covered", icon: "fas fa-store" },
    { number: "36", label: "States & UTs", icon: "fas fa-map-marked-alt" },
    { number: "Live", label: "Real-time Updates", icon: "fas fa-sync-alt" },
    { number: "100%", label: "Free & Open Access", icon: "fas fa-unlock" }
  ];

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Modern Navigation */}
      <Navigation />

      {/* Hero Section - Modern Design */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-16">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950"></div>
        <div className="absolute inset-0 bg-black/40"></div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto">
          <div className="mb-6">
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-amber-300 text-sm font-medium border border-white/10">
              🌾 Empowering Farmers with Smart Technology
            </span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 leading-tight">
            Empowering India's
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-emerald-400">
              Farmers
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-white/80 max-w-3xl mx-auto mb-10 leading-relaxed">
            Advanced AI-powered tools, live commodity prices from 500+ mandis, hyper-local weather alerts, and government schemes at your fingertips.
          </p>
          
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link 
              to="/prices" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-emerald-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-chart-line"></i>
              <span>Live Mandi Prices</span>
            </Link>
            <Link 
              to="/crop-doctor" 
              className="bg-gradient-to-r from-amber-500 to-orange-600 text-white px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-orange-500/25 transform hover:scale-105 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-microscope"></i>
              <span>AI Crop Doctor</span>
            </Link>
            <Link 
              to="/weather" 
              className="bg-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full text-lg font-semibold border border-white/20 hover:bg-white/20 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-cloud-sun"></i>
              <span>Weather Forecast</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-slate-800/60 border-y border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-slate-300 font-medium">{stat.label}</div>
                <i className={`${stat.icon} text-2xl text-emerald-400 mt-3`}></i>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section - Modern Cards */}
      <section className="py-20 bg-slate-900">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Everything You Need to
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400"> Succeed</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Comprehensive agricultural tools powered by cutting-edge data and AI
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800/70 border border-slate-700 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden h-full flex flex-col">
                  <div className={`h-2 bg-gradient-to-r ${feature.color}`}></div>
                  <div className="p-8 flex-1 flex flex-col">
                    <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <i className={`${feature.icon} text-white text-2xl`}></i>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                    <p className="text-slate-300 mb-6 leading-relaxed flex-1">{feature.description}</p>
                    <Link 
                      to={feature.link} 
                      className="inline-flex items-center text-emerald-400 font-semibold hover:text-emerald-300 transition-colors mt-auto"
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

      {/* Smart Technology Pillars Section */}
      <section className="py-20 bg-slate-800/40 border-t border-slate-700">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Why Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">Mandi Mitra</span>
            </h2>
            <p className="text-xl text-slate-400 max-w-3xl mx-auto">
              Built with modern technology to deliver instant, dependable agricultural insights
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {highlights.map((item, index) => (
              <div key={index} className="bg-slate-800/80 border border-slate-700 rounded-2xl p-8 hover:border-emerald-500/50 transition-all duration-300">
                <div className="w-14 h-14 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mb-6 text-emerald-400 text-2xl">
                  <i className={item.icon}></i>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-slate-300 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Direct Access */}
      <section className="py-20 bg-gradient-to-r from-emerald-800 via-teal-800 to-amber-800">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get instant access to live market prices, weather updates, and AI disease diagnosis—100% free with no registration required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/prices" 
              className="bg-white text-emerald-800 px-8 py-4 rounded-full text-lg font-semibold shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
            >
              Check Mandi Prices Now
            </Link>
            <Link 
              to="/schemes" 
              className="border-2 border-white text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-white hover:text-emerald-800 transition-all duration-300"
            >
              Browse Govt Schemes
            </Link>
          </div>
        </div>
      </section>

      {/* Footer - Clean 2-Column Design */}
      <footer className="bg-gray-950 text-white border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <i className="fas fa-handshake text-amber-400 text-2xl"></i>
                <h3 className="text-2xl font-bold tracking-wide">Mandi Mitra</h3>
              </div>
              <p className="text-gray-400 max-w-md mb-6 leading-relaxed">
                Empowering Indian farmers with real-time market prices, hyper-local weather intelligence, AI crop disease diagnostics, and welfare schemes.
              </p>
            </div>
            
            <div className="md:text-right">
              <h4 className="font-semibold text-lg text-white mb-4">Quick Links</h4>
              <ul className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-gray-400">
                <li><Link to="/prices" className="hover:text-emerald-400 transition">Market Prices</Link></li>
                <li><Link to="/weather" className="hover:text-emerald-400 transition">Weather Forecast</Link></li>
                <li><Link to="/crop-doctor" className="hover:text-emerald-400 transition">AI Crop Doctor</Link></li>
                <li><Link to="/news" className="hover:text-emerald-400 transition">Agri News</Link></li>
                <li><Link to="/schemes" className="hover:text-emerald-400 transition">Gov Schemes</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-10 pt-6 text-center text-gray-500 text-sm">
            <p>&copy; 2026 Mandi Mitra. Built with ❤️ for Indian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
