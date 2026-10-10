import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../src/components/Navigation';
import { API_BASE_URL } from '../src/config';

// Comprehensive Crop Emoji Dictionary with Fuzzy Match Fallback
const cropEmojiMap = {
  tomato: '🍅',
  carrot: '🥕',
  radish: '🥕',
  raddish: '🥕',
  mooli: '🥕',
  potato: '🥔',
  aloo: '🥔',
  onion: '🧅',
  pyaz: '🧅',
  wheat: '🌾',
  gehu: '🌾',
  rice: '🌾',
  paddy: '🌾',
  dhan: '🌾',
  maize: '🌽',
  makka: '🌽',
  corn: '🌽',
  sugarcane: '🍬',
  ganna: '🍬',
  banana: '🍌',
  kela: '🍌',
  apple: '🍎',
  seb: '🍎',
  mango: '🥭',
  aam: '🥭',
  grapes: '🍇',
  angoor: '🍇',
  lemon: '🍋',
  nimbu: '🍋',
  lime: '🍋',
  coconut: '🥥',
  nariyal: '🥥',
  guava: '🥝',
  amrood: '🥝',
  cauliflower: '🥦',
  gobhi: '🥦',
  cabbage: '🥬',
  patta: '🥬',
  peas: '🌱',
  matar: '🌱',
  chilli: '🌶️',
  chillie: '🌶️',
  mirch: '🌶️',
  pepper: '🌶️',
  ginger: '🫚',
  adrak: '🫚',
  garlic: '🧄',
  lahsun: '🧄',
  brinjal: '🍆',
  eggplant: '🍆',
  baingan: '🍆',
  aubergine: '🍆',
  gourd: '🥒',
  lauki: '🥒',
  karela: '🥒',
  cucumber: '🥒',
  kheera: '🥒',
  pumpkin: '🎃',
  kaddu: '🎃',
  bhindi: '🌿',
  okra: '🌿',
  coriander: '🌿',
  dhania: '🌿',
  spinach: '🥬',
  palak: '🥬',
  mustard: '🌾',
  sarson: '🌾',
  cotton: '☁️',
  kapas: '☁️',
  jaggery: '🍯',
  gur: '🍯',
  turmeric: '🫚',
  haldi: '🫚',
  soyabean: '🫘',
  soybean: '🫘',
  gram: '🫘',
  chana: '🫘',
  moong: '🫘',
  urad: '🫘',
  arhar: '🫘',
  tur: '🫘',
  dal: '🫘',
  groundnut: '🥜',
  peanut: '🥜',
  moongphali: '🥜',
  watermelon: '🍉',
  tarbooj: '🍉',
  muskmelon: '🍈',
  kharbooja: '🍈',
  papaya: '🍈',
  papita: '🍈',
  orange: '🍊',
  santara: '🍊',
  kinnow: '🍊',
  mosambi: '🍊',
  pomegranate: '🍎',
  anar: '🍎',
  capsicum: '🫑',
  shimla: '🫑',
  beetroot: '🍠',
  chukandar: '🍠'
};

const getCropEmoji = (name = '') => {
  const lower = name.toLowerCase();
  for (const [key, emoji] of Object.entries(cropEmojiMap)) {
    if (lower.includes(key)) return emoji;
  }
  return '🌱';
};

// Complete, alphabetically sorted list of all 36 Indian States & Union Territories
const indianStates = [
  "Andaman and Nicobar",
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chandigarh",
  "Chhattisgarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jammu and Kashmir",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Ladakh",
  "Lakshadweep",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Puducherry",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal"
];

const MandiPrice = () => {
  const [state, setState] = useState('Uttar Pradesh');
  const [district, setDistrict] = useState('');
  const [prices, setPrices] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCrops, setSelectedCrops] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [sortOption, setSortOption] = useState('modal_price');
  const [priceUnit, setPriceUnit] = useState('quintal'); // 'quintal' (100kg) or 'kg' (1kg)
  const [showPriceGuide, setShowPriceGuide] = useState(false);

  const fetchPrices = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get(`${API_BASE_URL}/api/commodity/prices?state=${encodeURIComponent(state)}`, {
        timeout: 20000
      });
      setPrices(response.data || []);
      setDistrict(''); // Reset district when state changes
    } catch (err) {
      console.error('Commodity API fetch error:', err);
      const errMsg = err.response?.data?.error || err.response?.data?.details || err.message || 'Failed to fetch commodity prices.';
      setError(errMsg);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrices();
  }, [state]);

  // Extract unique districts for the selected state
  const districts = Array.from(new Set(prices.map(item => item.district).filter(Boolean))).sort();

  // Filter prices by district if selected
  let filteredPrices = district ? prices.filter(item => item.district === district) : prices;

  // Filter by search text (match state, district, market, commodity)
  if (searchText.trim() !== '') {
    const lowerSearch = searchText.toLowerCase();
    filteredPrices = filteredPrices.filter(item =>
      (item.state && item.state.toLowerCase().includes(lowerSearch)) ||
      (item.district && item.district.toLowerCase().includes(lowerSearch)) ||
      (item.market && item.market.toLowerCase().includes(lowerSearch)) ||
      (item.commodity && item.commodity.toLowerCase().includes(lowerSearch))
    );
  }

  // Filter by selected crops if any
  if (selectedCrops.length > 0) {
    filteredPrices = filteredPrices.filter(item => selectedCrops.includes(item.commodity));
  }

  // Sort filtered prices by selected sort option
  filteredPrices = filteredPrices.slice().sort((a, b) => {
    if (sortOption === 'min_price') {
      return Number(a.min_price) - Number(b.min_price);
    } else if (sortOption === 'max_price') {
      return Number(a.max_price) - Number(b.max_price);
    } else if (sortOption === 'modal_price') {
      return Number(a.modal_price) - Number(b.modal_price);
    }
    return 0;
  });

  // Group prices by commodity
  const groupedPrices = filteredPrices.reduce((acc, item) => {
    if (!acc[item.commodity]) {
      acc[item.commodity] = [];
    }
    acc[item.commodity].push(item);
    return acc;
  }, {});

  const resetFilters = () => {
    setSearchText('');
    setDistrict('');
    setSelectedCrops([]);
    setSortOption('modal_price');
  };

  // Helper to format values based on selected unit
  const formatPriceValue = (val) => {
    const num = Number(val) || 0;
    if (priceUnit === 'kg') {
      return `₹${(num / 100).toFixed(2)}`;
    }
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const getSecondaryUnitText = (val) => {
    const num = Number(val) || 0;
    if (priceUnit === 'kg') {
      return `(₹${num.toLocaleString('en-IN')} / quintal)`;
    }
    return `(₹${(num / 100).toFixed(2)} / kg)`;
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <Navigation />

      {/* Hero Section */}
      <section className="relative py-16 px-4 overflow-hidden bg-gradient-to-br from-emerald-950 via-slate-900 to-amber-950 border-b border-slate-800">
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="relative z-10 max-w-6xl mx-auto text-center">
          <span className="inline-block px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-semibold rounded-full mb-4">
            🌾 Live National Agricultural Market (APMC) Data
          </span>
          <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 tracking-tight">
            Live Mandi Prices Across India
          </h1>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8">
            Real-time modal trading rates, daily minimum/maximum prices, and market arrivals direct from government mandis.
          </p>

          <div className="flex flex-wrap justify-center items-center gap-3">
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2.5 flex items-center space-x-2">
              <i className="fas fa-store text-emerald-400"></i>
              <span className="text-sm font-medium text-slate-200"><b>{prices.length}</b> Market Records</span>
            </div>
            <div className="bg-slate-800/80 backdrop-blur-md border border-slate-700 rounded-xl px-4 py-2.5 flex items-center space-x-2">
              <i className="fas fa-seedling text-amber-400"></i>
              <span className="text-sm font-medium text-slate-200"><b>{Object.keys(groupedPrices).length}</b> Commodities</span>
            </div>
            <button
              onClick={() => setShowPriceGuide(!showPriceGuide)}
              className="bg-amber-500/20 hover:bg-amber-500/30 border border-amber-500/40 text-amber-300 rounded-xl px-4 py-2.5 text-sm font-semibold flex items-center space-x-2 transition"
            >
              <i className="fas fa-question-circle"></i>
              <span>{showPriceGuide ? 'Hide Price Guide' : 'How Mandi Prices Work?'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Explainer / Educational Banner */}
      {showPriceGuide && (
        <section className="bg-slate-800/90 border-b border-amber-500/30 py-6 px-4 animate-fadeIn">
          <div className="max-w-6xl mx-auto">
            <h3 className="text-lg font-bold text-amber-300 mb-3 flex items-center">
              <i className="fas fa-info-circle mr-2"></i> Understanding Mandi Price Terms & Measurements
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div className="font-bold text-emerald-400 mb-1">⚖️ 1 Quintal (क्विंटल)</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  <b>1 Quintal = 100 Kilograms (kg)</b>. Government mandis quote wholesale prices per quintal. (e.g. ₹1,500/quintal = ₹15.00/kg).
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div className="font-bold text-amber-400 mb-1">🏷️ Modal Price (बाजार भाव)</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  The <b>most common / average trading price</b> at which majority of the farmer's produce was sold in that mandi today.
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div className="font-bold text-green-400 mb-1">📉 Min Price (न्यूनतम भाव)</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  The lowest price recorded for lower grade, higher moisture, or bulk clearance lots traded today.
                </p>
              </div>
              <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700">
                <div className="font-bold text-red-400 mb-1">📈 Max Price (अधिकतम भाव)</div>
                <p className="text-slate-300 text-xs leading-relaxed">
                  The highest price achieved by premium, top-tier Grade-A quality produce in that mandi.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Controls & Filter Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/70 backdrop-blur-md rounded-2xl p-6 border border-slate-700 shadow-xl">
            
            {/* Top Bar: Search and Unit Switcher */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-6 pb-6 border-b border-slate-700">
              <div className="relative w-full md:w-96">
                <i className="fas fa-search absolute left-4 top-3.5 text-slate-400"></i>
                <input
                  type="text"
                  placeholder="Search crop, district, or APMC mandi..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-slate-900/90 border border-slate-600 rounded-xl pl-11 pr-4 py-2.5 text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-sm"
                />
              </div>

              {/* Price Unit Switcher Toggle */}
              <div className="flex items-center space-x-3 w-full md:w-auto justify-end">
                <span className="text-sm text-slate-300 font-medium">Display Price As:</span>
                <div className="bg-slate-900 p-1 rounded-xl border border-slate-700 flex">
                  <button
                    onClick={() => setPriceUnit('quintal')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      priceUnit === 'quintal'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>⚖️ ₹ / Quintal (100 kg)</span>
                  </button>
                  <button
                    onClick={() => setPriceUnit('kg')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition flex items-center space-x-1.5 ${
                      priceUnit === 'kg'
                        ? 'bg-emerald-600 text-white shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <span>🛍️ ₹ / kg (Kilogram)</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Filter Dropdowns Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-end">
              {/* State Selection with Grouped Active/Pending Status */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Select State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                >
                  {indianStates.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Filter District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                >
                  <option value="">All Districts ({districts.length})</option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              {/* Sort Option */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Sort By Rate</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-600 rounded-xl px-4 py-2.5 text-white focus:ring-2 focus:ring-emerald-500 text-sm font-medium"
                >
                  <option value="modal_price">Modal Price (Highest First)</option>
                  <option value="min_price">Minimum Price (Lowest First)</option>
                  <option value="max_price">Maximum Price (Highest First)</option>
                </select>
              </div>

              {/* Reset Button */}
              <div>
                <button
                  onClick={resetFilters}
                  className="w-full bg-slate-700/80 hover:bg-slate-700 border border-slate-600 text-slate-200 px-4 py-2.5 rounded-xl transition text-sm font-semibold flex items-center justify-center space-x-2"
                >
                  <i className="fas fa-undo text-xs"></i>
                  <span>Reset Filters</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-6 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="text-center py-24 bg-slate-800/40 rounded-2xl border border-slate-700">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-emerald-500 border-t-transparent mb-4"></div>
              <p className="text-slate-300 text-lg font-medium">Fetching real-time market data for {state}...</p>
              <p className="text-slate-500 text-sm mt-1">Connecting to National Data Portal (data.gov.in)</p>
            </div>
          )}

          {error && !loading && (
            <div className="text-center py-12 px-6 bg-red-950/40 border border-red-800/60 rounded-3xl max-w-2xl mx-auto p-6 shadow-2xl">
              <i className="fas fa-exclamation-triangle text-amber-400 text-3xl mb-3"></i>
              <h3 className="text-lg font-bold text-red-200 mb-2">{error}</h3>
              <p className="text-slate-300 text-xs max-w-lg mx-auto mb-6 leading-relaxed">
                Queries are transmitted directly to the central National Data Portal (data.gov.in) with your authenticated API key. If the central government portal is slow, experiencing network timeouts, or undergoing server maintenance, please click retry below.
              </p>

              <div className="flex flex-wrap justify-center items-center gap-3 mb-6">
                <button
                  onClick={fetchPrices}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center space-x-2 transition shadow-lg shadow-emerald-600/30"
                >
                  <i className="fas fa-sync-alt"></i>
                  <span>Retry Fetching {state}</span>
                </button>
              </div>

              <div className="border-t border-red-900/40 pt-4 text-left">
                <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2 text-center">
                  Or Test Another State APMC:
                </span>
                <div className="flex flex-wrap justify-center gap-2">
                  {['Uttar Pradesh', 'Tamil Nadu', 'Maharashtra', 'Gujarat', 'Punjab', 'Madhya Pradesh', 'Karnataka'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setState(st)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition border ${
                        state === st
                          ? 'bg-emerald-600 text-white border-emerald-500'
                          : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                      }`}
                    >
                      📍 {st}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {!loading && !error && Object.keys(groupedPrices).length === 0 && (
            <div className="text-center py-14 px-6 bg-slate-800/60 rounded-3xl border border-slate-700 max-w-2xl mx-auto shadow-2xl">
              <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-4 text-amber-400 text-3xl">
                <i className="fas fa-clock"></i>
              </div>
              <h3 className="text-2xl font-bold text-white mb-2">No Market Arrivals Reported for {state} Today</h3>
              <p className="text-slate-300 text-sm leading-relaxed mb-6">
                Under the central Agmarknet system, data is uploaded as individual state APMC auction centers complete their daily market bidding. The <b>{state} State Agricultural Marketing Board</b> has not uploaded today's batch to the central portal (data.gov.in) yet.
              </p>

              <div className="bg-slate-900/80 rounded-2xl p-4 border border-slate-700/80 mb-6 text-left">
                <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-2 flex items-center">
                  <i className="fas fa-arrow-right mr-1.5"></i> Check Active Mandi States with Live Data:
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Tamil Nadu', 'Andhra Pradesh', 'Maharashtra', 'Telangana', 'Uttar Pradesh', 'Punjab'].map((st) => (
                    <button
                      key={st}
                      onClick={() => setState(st)}
                      className="bg-slate-800 hover:bg-emerald-600 border border-slate-700 hover:border-emerald-500 text-slate-200 hover:text-white px-3 py-1.5 rounded-lg text-xs font-medium transition"
                    >
                      📍 {st}
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={resetFilters}
                className="bg-slate-700 hover:bg-slate-600 text-slate-300 text-xs font-semibold px-4 py-2 rounded-lg transition"
              >
                Clear Search Filters
              </button>
            </div>
          )}

          {!loading && !error && Object.keys(groupedPrices).map((commodity) => {
            const items = groupedPrices[commodity];
            const emoji = getCropEmoji(commodity);

            return (
              <div key={commodity} className="mb-10">
                {/* Commodity Group Title */}
                <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-800">
                  <div className="flex items-center space-x-3">
                    <span className="text-3xl bg-slate-800 p-2 rounded-2xl border border-slate-700">{emoji}</span>
                    <div>
                      <h2 className="text-2xl font-bold text-white tracking-wide">{commodity}</h2>
                      <p className="text-xs text-slate-400">{items.length} Mandi {items.length === 1 ? 'Market' : 'Markets'} Reporting</p>
                    </div>
                  </div>
                </div>

                {/* Mandi Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                  {items.map((item, idx) => {
                    const minP = Number(item.min_price) || 0;
                    const maxP = Number(item.max_price) || 0;
                    const modalP = Number(item.modal_price) || 0;

                    return (
                      <div
                        key={idx}
                        className="bg-slate-800/80 backdrop-blur-sm rounded-2xl p-5 border border-slate-700 hover:border-emerald-500/70 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between"
                      >
                        {/* Top Header */}
                        <div>
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <span className="inline-block px-2.5 py-0.5 bg-slate-700/60 text-emerald-300 text-xs font-semibold rounded-md mb-1.5 border border-slate-600">
                                📍 {item.district || 'General District'}
                              </span>
                              <h3 className="text-lg font-bold text-white leading-snug">{item.market}</h3>
                              <p className="text-xs text-slate-400">{item.state}</p>
                            </div>

                            {/* Main Rate Highlight */}
                            <div className="text-right">
                              <span className="inline-block px-2 py-0.5 bg-emerald-500/20 text-emerald-400 text-[10px] font-extrabold uppercase tracking-wider rounded-md border border-emerald-500/30 mb-1">
                                Modal Rate
                              </span>
                              <div className="text-2xl font-black text-emerald-400 leading-none">
                                {formatPriceValue(modalP)}
                              </div>
                              <div className="text-[11px] text-slate-400 font-medium mt-0.5">
                                per {priceUnit === 'kg' ? 'kg' : 'quintal'}
                              </div>
                              <div className="text-[10px] text-slate-500">
                                {getSecondaryUnitText(modalP)}
                              </div>
                            </div>
                          </div>

                          {/* Price Range Breakdown Box */}
                          <div className="bg-slate-900/90 rounded-xl p-3 border border-slate-700/80 mb-4">
                            <div className="text-[11px] font-semibold text-slate-400 mb-2 flex justify-between">
                              <span>Daily Price Range</span>
                              <span className="text-emerald-400 font-normal">
                                Diff: {formatPriceValue(maxP - minP)}
                              </span>
                            </div>

                            {/* Range Bar */}
                            <div className="relative w-full h-2 bg-slate-700 rounded-full mb-3 overflow-hidden">
                              <div className="absolute inset-y-0 left-0 bg-gradient-to-r from-green-500 via-amber-500 to-red-500 w-full rounded-full"></div>
                            </div>

                            <div className="grid grid-cols-3 gap-1 text-center">
                              <div className="bg-slate-800/60 p-1.5 rounded-lg">
                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Min Rate</div>
                                <div className="text-xs font-bold text-green-400 mt-0.5">{formatPriceValue(minP)}</div>
                              </div>
                              <div className="bg-emerald-950/40 p-1.5 rounded-lg border border-emerald-500/30">
                                <div className="text-[10px] text-emerald-300 uppercase font-semibold">Modal (Avg)</div>
                                <div className="text-xs font-bold text-emerald-400 mt-0.5">{formatPriceValue(modalP)}</div>
                              </div>
                              <div className="bg-slate-800/60 p-1.5 rounded-lg">
                                <div className="text-[10px] text-slate-400 uppercase font-semibold">Max Rate</div>
                                <div className="text-xs font-bold text-red-400 mt-0.5">{formatPriceValue(maxP)}</div>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Metadata Footer Badges */}
                        <div className="pt-3 border-t border-slate-700/70 flex flex-wrap justify-between items-center text-xs text-slate-400 gap-2">
                          <div className="flex flex-wrap gap-1.5">
                            <span className="bg-slate-700/50 px-2 py-0.5 rounded text-[11px]">
                              Var: <b className="text-slate-200">{item.variety || 'Standard'}</b>
                            </span>
                            <span className="bg-slate-700/50 px-2 py-0.5 rounded text-[11px]">
                              Grade: <b className="text-slate-200">{item.grade || 'FAQ'}</b>
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            📅 {item.arrival_date || new Date().toLocaleDateString('en-GB')}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Footer Banner */}
      <section className="py-10 px-4 bg-slate-950 border-t border-slate-800 text-center text-slate-500 text-xs">
        <p>Market data provided by Directorate of Marketing & Inspection (DMI), Ministry of Agriculture and Farmers Welfare, Govt of India.</p>
        <p className="mt-1">All prices updated daily. 1 Quintal = 100 kg.</p>
      </section>
    </div>
  );
};

export default MandiPrice;
