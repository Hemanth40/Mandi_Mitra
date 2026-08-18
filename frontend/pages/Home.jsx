import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../src/components/Navigation';

const Home = () => {
  const liveTickerItems = [
    { crop: 'Wheat (गेहूं)', market: 'Khanna APMC, Punjab', price: '₹2,275/q', kg: '₹22.75/kg', trend: '+2.4%', up: true, emoji: '🌾' },
    { crop: 'Tomato (टमाटर)', market: 'Nashik APMC, Maharashtra', price: '₹1,850/q', kg: '₹18.50/kg', trend: '+5.1%', up: true, emoji: '🍅' },
    { crop: 'Potato (आलू)', market: 'Agra APMC, Uttar Pradesh', price: '₹1,200/q', kg: '₹12.00/kg', trend: '-1.2%', up: false, emoji: '🥔' },
    { crop: 'Onion (प्याज़)', market: 'Lasalgaon Mandi, Maharashtra', price: '₹2,100/q', kg: '₹21.00/kg', trend: '+3.8%', up: true, emoji: '🧅' },
    { crop: 'Brinjal (बैंगन)', market: 'Bulandshahar, UP', price: '₹1,500/q', kg: '₹15.00/kg', trend: '+1.0%', up: true, emoji: '🍆' },
    { crop: 'Maize (मक्का)', market: 'Davangere, Karnataka', price: '₹1,950/q', kg: '₹19.50/kg', trend: '-0.5%', up: false, emoji: '🌽' },
    { crop: 'Jaggery (गुड़)', market: 'Chittoor APMC, Andhra', price: '₹1,950/q', kg: '₹19.50/kg', trend: '+1.8%', up: true, emoji: '🍯' },
    { crop: 'Radish (मूली)', market: 'Hathras Mandi, UP', price: '₹850/q', kg: '₹8.50/kg', trend: '-2.0%', up: false, emoji: '🥕' },
    { crop: 'Cotton (कपास)', market: 'Rajkot APMC, Gujarat', price: '₹7,150/q', kg: '₹71.50/kg', trend: '+4.2%', up: true, emoji: '☁️' },
  ];

  const stats = [
    { number: "500+", label: "Mandis Covered", icon: "fas fa-store", desc: "Live APMC auction centers reporting daily" },
    { number: "36", label: "States & UTs", icon: "fas fa-map-marked-alt", desc: "Nationwide agricultural coverage" },
    { number: "< 1.8s", label: "AI Scan Speed", icon: "fas fa-bolt", desc: "Instant computer vision disease detection" },
    { number: "100%", label: "Free & Open Access", icon: "fas fa-unlock", desc: "Zero logins or subscription paywalls" }
  ];

  const workflowSteps = [
    {
      step: "01",
      title: "Check Live Mandi Prices",
      desc: "Compare daily modal prices across 500+ mandis. Switch between ₹/Quintal and ₹/kg to negotiate fair rates.",
      icon: "fas fa-chart-line",
      link: "/prices"
    },
    {
      step: "02",
      title: "Scan & Protect Your Crops",
      desc: "Upload a photo of damaged leaves or pests to receive instant AI diagnosis and chemical/organic remedies.",
      icon: "fas fa-microscope",
      link: "/crop-doctor"
    },
    {
      step: "03",
      title: "Plan with Agro-Weather",
      desc: "Get hyper-local rain forecasts, soil moisture indices, and pesticide spraying advisory windows.",
      icon: "fas fa-cloud-sun",
      link: "/weather"
    },
    {
      step: "04",
      title: "Access Welfare Schemes",
      desc: "Browse PM-Kisan, PMFBY, and subsidy programs with document checklists and direct application links.",
      icon: "fas fa-gavel",
      link: "/schemes"
    }
  ];

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-emerald-500 selection:text-white">
      {/* Frosted Floating Navigation */}
      <Navigation />

      {/* Hero Section with Cinematic Photography */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden py-20 px-4">
        {/* Authentic High-Resolution Photography Background */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat transform scale-105 transition-transform duration-1000"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=1920&auto=format&fit=crop&q=80')`
          }}
        ></div>
        
        {/* Modern Multi-Layer Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/80 to-[#090d16]/40"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/60 via-transparent to-amber-950/60"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-transparent via-[#090d16]/60 to-[#090d16]"></div>

        <div className="relative z-10 text-center max-w-5xl mx-auto pt-6">
          {/* Live Status Pill */}
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-slate-900/80 backdrop-blur-xl rounded-full border border-emerald-500/30 text-emerald-400 text-xs font-semibold shadow-2xl mb-8 animate-fadeIn">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping"></span>
            <span>🌾 Empowering Indian Farmers with Smart Agricultural Intelligence</span>
          </div>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-6 tracking-tight leading-[1.15]">
            Smarter Farming.<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-emerald-400 to-teal-300">
              Better Prices. Zero Guesswork.
            </span>
          </h1>
          
          <p className="text-base sm:text-xl md:text-2xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            Real-time mandi prices from 500+ markets, deep-learning crop disease diagnosis, hyper-local agro-weather, and government welfare schemes—100% free and open.
          </p>
          
          {/* Hero Action CTA Buttons */}
          <div className="flex flex-wrap gap-4 justify-center items-center">
            <Link 
              to="/prices" 
              className="bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-bold px-8 py-4 rounded-2xl text-base sm:text-lg shadow-xl shadow-emerald-500/20 transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
              <i className="fas fa-chart-line text-slate-950 text-lg"></i>
              <span>Live Mandi Prices</span>
            </Link>

            <Link 
              to="/crop-doctor" 
              className="bg-slate-900/90 hover:bg-slate-800 backdrop-blur-xl text-white font-semibold px-8 py-4 rounded-2xl text-base sm:text-lg border border-slate-700 hover:border-amber-500/50 shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center space-x-3"
            >
              <i className="fas fa-microscope text-amber-400 text-lg"></i>
              <span>AI Crop Doctor</span>
            </Link>

            <Link 
              to="/weather" 
              className="bg-slate-900/70 hover:bg-slate-800 backdrop-blur-xl text-slate-300 hover:text-white font-medium px-6 py-4 rounded-2xl text-base border border-slate-800 hover:border-slate-600 transition-all duration-300 flex items-center space-x-2"
            >
              <i className="fas fa-cloud-sun text-blue-400"></i>
              <span>Agro Weather</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Live Horizontal Mandi Marquee Ticker */}
      <section className="py-3 bg-slate-950/90 border-y border-slate-800/80 overflow-hidden relative shadow-inner">
        <div className="flex items-center">
          <div className="hidden md:flex items-center space-x-2 pl-6 pr-4 bg-slate-950 text-emerald-400 text-xs font-bold uppercase tracking-wider z-10 shrink-0 border-r border-slate-800">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Mandis</span>
          </div>

          <div className="overflow-hidden whitespace-nowrap w-full">
            <div className="animate-marquee flex space-x-8">
              {[...liveTickerItems, ...liveTickerItems].map((item, idx) => (
                <div key={idx} className="inline-flex items-center space-x-2 text-xs text-slate-300">
                  <span className="text-sm">{item.emoji}</span>
                  <span className="font-semibold text-white">{item.crop}</span>
                  <span className="text-slate-500">({item.market}):</span>
                  <span className="font-bold text-emerald-400">{item.price}</span>
                  <span className="text-[10px] text-slate-400">{item.kg}</span>
                  <span className={`text-[10px] font-bold ${item.up ? 'text-green-400' : 'text-red-400'}`}>
                    {item.trend}
                  </span>
                  <span className="text-slate-700">|</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Stats Counter Section */}
      <section className="py-16 px-4 bg-gradient-to-b from-[#090d16] to-slate-900 border-b border-slate-800/60">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((st, i) => (
              <div 
                key={i} 
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 text-center hover:border-emerald-500/40 transition-all duration-300 hover:shadow-lg"
              >
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-xl mx-auto mb-4">
                  <i className={st.icon}></i>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-white mb-1 tracking-tight">{st.number}</div>
                <div className="text-sm font-semibold text-emerald-300 mb-1">{st.label}</div>
                <div className="text-xs text-slate-400 leading-snug">{st.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 2026 Redesigned Clean Feature Showcase */}
      <section className="py-24 px-4 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
            Intelligent Agri Tools
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 mb-4 tracking-tight">
            Complete Digital Toolkit for <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-amber-400">Modern Agriculture</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-base sm:text-lg">
            Built from the ground up to give farmers immediate market leverage, crop protection, and seasonal intelligence.
          </p>
        </div>

        {/* 4 Balanced High-Impact Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Card 1: Mandi Price Intelligence */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-emerald-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-emerald-500/10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-chart-line"></i>
                </div>
                <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full">
                  Live data.gov.in
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Live Mandi Market Intelligence</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Access real-time arrival auctions across 500+ mandis in 36 states. Compare daily modal rates, minimum and maximum price spreads, and switch between <b>₹/Quintal</b> and <b>₹/kg</b> with one tap.
              </p>

              {/* Interactive Live Price Range Widget */}
              <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/90 mb-6">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-slate-400 font-semibold flex items-center">
                    <span className="text-base mr-1.5">🍅</span> Nashik APMC Mandi
                  </span>
                  <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                    Modal: ₹1,850/q (₹18.50/kg)
                  </span>
                </div>
                <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div className="bg-gradient-to-r from-green-500 via-amber-500 to-red-500 w-full h-full rounded-full"></div>
                </div>
                <div className="flex justify-between text-[11px] text-slate-400 font-medium">
                  <span>Min: ₹1,600/q</span>
                  <span>Max: ₹2,100/q</span>
                </div>
              </div>
            </div>

            <Link 
              to="/prices" 
              className="inline-flex items-center justify-between bg-slate-800/80 hover:bg-emerald-600 text-emerald-300 hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-all border border-slate-700 hover:border-emerald-500"
            >
              <span>Explore Live Mandi Prices</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Card 2: AI Crop Doctor */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-amber-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-amber-500/10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-amber-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-microscope"></i>
                </div>
                <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-full">
                  Kindwise AI Vision
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">AI Crop Doctor & Disease Scanner</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Take or upload a picture of an infected leaf or pest. Deep learning neural models identify fungal, bacterial, and pest infestations within <b>1.8 seconds</b> and provide actionable treatment steps.
              </p>

              {/* Interactive Mock Scan Preview */}
              <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/90 mb-6">
                <div className="flex justify-between items-center text-xs mb-3">
                  <span className="text-slate-300 font-semibold flex items-center space-x-2">
                    <i className="fas fa-shield-virus text-amber-400"></i>
                    <span>Early Blight Detected (95% Match)</span>
                  </span>
                  <span className="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                    Remedy Ready
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  <b>Recommended Treatment:</b> Apply Copper Oxychloride 50 WP (3g/L water) or organic neem oil extract (5ml/L).
                </p>
              </div>
            </div>

            <Link 
              to="/crop-doctor" 
              className="inline-flex items-center justify-between bg-slate-800/80 hover:bg-amber-600 text-amber-300 hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-all border border-slate-700 hover:border-amber-500"
            >
              <span>Diagnose Crop Diseases</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Card 3: Agro-Weather Radar */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-blue-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-cloud-sun"></i>
                </div>
                <span className="text-xs font-bold text-blue-400 bg-blue-500/10 border border-blue-500/30 px-3 py-1 rounded-full">
                  Open-Meteo Satellite
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Hyper-Local Agro-Weather</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                7-day predictive weather radar with soil moisture analysis, precipitation probabilities, and pesticide spraying advisory windows tailored to farming operations.
              </p>

              {/* Weather Telemetry Preview */}
              <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/90 mb-6 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="bg-slate-900/60 p-2.5 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Temp</div>
                  <div className="text-sm font-bold text-white mt-0.5">28°C 🌤️</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Rain Risk</div>
                  <div className="text-sm font-bold text-blue-400 mt-0.5">10% Low</div>
                </div>
                <div className="bg-slate-900/60 p-2.5 rounded-xl">
                  <div className="text-slate-400 text-[10px] uppercase font-bold">Spray Window</div>
                  <div className="text-sm font-bold text-emerald-400 mt-0.5">Optimal</div>
                </div>
              </div>
            </div>

            <Link 
              to="/weather" 
              className="inline-flex items-center justify-between bg-slate-800/80 hover:bg-blue-600 text-blue-300 hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-all border border-slate-700 hover:border-blue-500"
            >
              <span>View Weather Forecast</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

          {/* Card 4: Government Schemes & Welfare */}
          <div className="bg-slate-900/90 backdrop-blur-xl border border-slate-800 hover:border-rose-500/50 rounded-3xl p-8 transition-all duration-300 hover:shadow-2xl hover:shadow-rose-500/10 flex flex-col justify-between group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-48 h-48 bg-rose-500/5 rounded-full blur-3xl pointer-events-none"></div>

            <div>
              <div className="flex justify-between items-start mb-6">
                <div className="w-14 h-14 rounded-2xl bg-rose-500/10 border border-rose-500/30 flex items-center justify-center text-rose-400 text-2xl group-hover:scale-110 transition-transform">
                  <i className="fas fa-gavel"></i>
                </div>
                <span className="text-xs font-bold text-rose-400 bg-rose-500/10 border border-rose-500/30 px-3 py-1 rounded-full">
                  Direct Farmer Subsidies
                </span>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-3">Government Welfare & Schemes Directory</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Direct access to PM-Kisan (₹6,000/yr), PMFBY Crop Insurance, Agriculture Infrastructure Fund (AIF), Soil Health Cards, and solar pump subsidies with eligibility guides.
              </p>

              {/* Schemes Checklist Preview */}
              <div className="bg-slate-950/90 rounded-2xl p-5 border border-slate-800/90 mb-6 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>🏛️ PM-Kisan Samman Nidhi</span>
                  <b className="text-emerald-400">₹6,000 / Year</b>
                </div>
                <div className="flex justify-between text-slate-300 font-medium">
                  <span>🛡️ PM Fasal Bima Yojana</span>
                  <b className="text-rose-400">98% Subsidy</b>
                </div>
              </div>
            </div>

            <Link 
              to="/schemes" 
              className="inline-flex items-center justify-between bg-slate-800/80 hover:bg-rose-600 text-rose-300 hover:text-white px-5 py-3 rounded-xl font-bold text-sm transition-all border border-slate-700 hover:border-rose-500"
            >
              <span>Browse Govt Schemes</span>
              <i className="fas fa-arrow-right text-xs"></i>
            </Link>
          </div>

        </div>
      </section>

      {/* How Mandi Mitra Works - 4 Step Interactive Workflow */}
      <section className="py-20 px-4 bg-gradient-to-b from-slate-900 to-[#090d16] border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-xs font-bold uppercase tracking-widest text-emerald-400 bg-emerald-500/10 px-3.5 py-1 rounded-full border border-emerald-500/20">
              Simple 4-Step Workflow
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 mb-3">
              How Mandi Mitra Empowers Your Harvest
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto">
              From daily sowing to final market selling, get actionable data every step of the season.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {workflowSteps.map((wf, idx) => (
              <div 
                key={idx}
                className="bg-slate-900/60 backdrop-blur-xl border border-slate-800 rounded-2xl p-6 relative hover:border-emerald-500/40 transition-all duration-300 group"
              >
                <div className="text-3xl font-black text-slate-700/60 mb-4 group-hover:text-emerald-500/40 transition-colors">
                  {wf.step}
                </div>
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 text-lg mb-4">
                  <i className={wf.icon}></i>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">{wf.title}</h4>
                <p className="text-slate-400 text-xs leading-relaxed mb-4">{wf.desc}</p>
                <Link to={wf.link} className="text-xs font-bold text-emerald-400 hover:text-emerald-300 inline-flex items-center space-x-1">
                  <span>Try Tool</span>
                  <i className="fas fa-chevron-right text-[10px]"></i>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modern Call to Action */}
      <section className="py-20 px-4 relative overflow-hidden">
        <div className="max-w-5xl mx-auto bg-gradient-to-r from-emerald-900/80 via-slate-900 to-amber-900/80 border border-slate-700/80 rounded-3xl p-10 md:p-16 text-center relative backdrop-blur-2xl shadow-2xl">
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-5xl font-black text-white mb-4 tracking-tight">
              Ready to Upgrade Your Agricultural Strategy?
            </h2>
            <p className="text-slate-300 text-base sm:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
              Start checking real-time mandi prices, scanning crop health, and preparing for the week's weather—completely free with zero registration.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link 
                to="/prices" 
                className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold px-8 py-4 rounded-2xl shadow-lg transition transform hover:-translate-y-0.5"
              >
                Check Today's Mandi Prices
              </Link>
              <Link 
                to="/crop-doctor" 
                className="bg-slate-800 hover:bg-slate-700 text-white font-bold px-8 py-4 rounded-2xl border border-slate-600 transition"
              >
                Scan Crops with AI
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Clean 2-Column 2026 Footer */}
      <footer className="bg-slate-950 text-white border-t border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
            <div>
              <div className="flex items-center space-x-2.5 mb-3">
                <div className="w-8 h-8 rounded-lg bg-emerald-500 flex items-center justify-center text-slate-950 font-bold">
                  <i className="fas fa-seedling"></i>
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">Mandi Mitra</h3>
              </div>
              <p className="text-slate-400 text-sm max-w-md leading-relaxed">
                Empowering Indian farmers with real-time market data, AI computer vision crop diagnostics, hyper-local meteorological forecasts, and government welfare schemes.
              </p>
            </div>
            
            <div className="md:text-right">
              <h4 className="font-semibold text-sm text-slate-300 mb-3 uppercase tracking-wider">Quick Navigation</h4>
              <ul className="flex flex-wrap md:justify-end gap-x-6 gap-y-2 text-sm text-slate-400">
                <li><Link to="/prices" className="hover:text-emerald-400 transition">Market Prices</Link></li>
                <li><Link to="/weather" className="hover:text-emerald-400 transition">Agro Weather</Link></li>
                <li><Link to="/crop-doctor" className="hover:text-emerald-400 transition">AI Crop Doctor</Link></li>
                <li><Link to="/news" className="hover:text-emerald-400 transition">Agri News</Link></li>
                <li><Link to="/schemes" className="hover:text-emerald-400 transition">Gov Schemes</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800/80 mt-10 pt-6 text-center text-slate-500 text-xs">
            <p>&copy; 2026 Mandi Mitra. Built with ❤️ for Indian farmers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
