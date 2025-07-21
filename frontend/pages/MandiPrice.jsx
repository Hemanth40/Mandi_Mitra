import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navigation from '../src/components/Navigation';

const cropEmojis = {
  Tomato: '🍅',
  Carrot: '🥕',
  Potato: '🥔',
  Onion: '🧅',
  Wheat: '🌾',
  Rice: '🌾',
  Maize: '🌽',
  Sugarcane: '🍬',
  Banana: '🍌',
  Apple: '🍎',
  Mango: '🥭',
  Grapes: '🍇',
  Lemon: '🍋',
  Coconut: '🥥',
  Guava: '🥝',
  Cauliflower: '🥦',
  Cabbage: '🥬',
  Peas: '🌱',
  Chillies: '🌶️',
  Ginger: '🫚',
  Garlic: '🧄',
  // Add more mappings as needed
};

const allStatesIndia = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Puducherry",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Lakshadweep",
  "Andaman and Nicobar Islands"
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
  const [cropDropdownOpen, setCropDropdownOpen] = useState(false);
  const [cropSearchText, setCropSearchText] = useState('');

  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`http://localhost:5000/api/commodity/prices?state=${state}`);
        setPrices(response.data);
        setDistrict(''); // Reset district when state changes
      } catch (err) {
        setError('Failed to fetch commodity prices');
      } finally {
        setLoading(false);
      }
    };

    fetchPrices();
  }, [state]);

  // Extract unique districts for the selected state
  const districts = Array.from(new Set(prices.map(item => item.district))).sort();

  // Filter prices by district if selected
  let filteredPrices = district ? prices.filter(item => item.district === district) : prices;

  // Filter by search text (match state, district, market, commodity)
  if (searchText.trim() !== '') {
    const lowerSearch = searchText.toLowerCase();
    filteredPrices = filteredPrices.filter(item =>
      item.state.toLowerCase().includes(lowerSearch) ||
      item.district.toLowerCase().includes(lowerSearch) ||
      item.market.toLowerCase().includes(lowerSearch) ||
      item.commodity.toLowerCase().includes(lowerSearch)
    );
  }

  // Filter by selected crops if any
  if (selectedCrops.length > 0) {
    filteredPrices = filteredPrices.filter(item => selectedCrops.includes(item.commodity));
  }

  // Sort filtered prices by selected sort option
  filteredPrices = filteredPrices.slice().sort((a, b) => {
    if (sortOption === 'min_price') {
      return a.min_price - b.min_price;
    } else if (sortOption === 'max_price') {
      return a.max_price - b.max_price;
    } else if (sortOption === 'modal_price') {
      return a.modal_price - b.modal_price;
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

  const addCrop = (crop) => {
    if (!selectedCrops.includes(crop)) {
      setSelectedCrops([...selectedCrops, crop]);
    }
  };

  const removeCrop = (crop) => {
    setSelectedCrops(selectedCrops.filter(c => c !== crop));
  };

  const resetFilters = () => {
    setSearchText('');
    setDistrict('');
    setSelectedCrops([]);
    setSortOption('modal_price');
  };

  const toggleCropSelection = () => {
    setCropDropdownOpen(!cropDropdownOpen);
    setCropSearchText('');
  };

  // Filter crops by cropSearchText
  const filteredCrops = Object.keys(groupedPrices).filter(commodity =>
    commodity.toLowerCase().includes(cropSearchText.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-amber-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Live Market Prices</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real-time commodity prices from markets across India
          </p>
          <div className="mt-6 flex justify-center space-x-4">
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">📊 {prices.length} Active Markets</span>
            </div>
            <div className="bg-white/20 backdrop-blur-sm rounded-lg px-4 py-2">
              <span className="text-white text-sm">🌾 {Object.keys(groupedPrices).length} Commodities</span>
            </div>
          </div>
        </div>
      </section>

      {/* Controls Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 items-end">
              {/* State Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">State</label>
                <select
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500"
                >
                  {allStatesIndia.map((st) => (
                    <option key={st} value={st} className="bg-slate-700">{st}</option>
                  ))}
                </select>
              </div>

              {/* District Selection */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">District</label>
                <select
                  value={district}
                  onChange={(e) => setDistrict(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="" className="bg-slate-700">All Districts</option>
                  {districts.map((dist) => (
                    <option key={dist} value={dist} className="bg-slate-700">{dist}</option>
                  ))}
                </select>
              </div>

              {/* Sort Options */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Sort By</label>
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="modal_price" className="bg-slate-700">Modal Price</option>
                  <option value="min_price" className="bg-slate-700">Min Price</option>
                  <option value="max_price" className="bg-slate-700">Max Price</option>
                </select>
              </div>

              {/* Reset Button */}
              <button
                onClick={resetFilters}
                className="bg-emerald-600 text-white px-4 py-3 rounded-lg hover:bg-emerald-700 transition font-medium"
              >
                <i className="fas fa-refresh mr-2"></i>Reset
              </button>
            </div>

            {/* Search and Crop Selection */}
            <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Search</label>
                <input
                  type="text"
                  placeholder="Search markets, crops, districts..."
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium text-slate-300 mb-2">Select Crops</label>
                <button
                  onClick={toggleCropSelection}
                  className="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white text-left flex justify-between items-center"
                >
                  <span>{selectedCrops.length > 0 ? `${selectedCrops.length} crops selected` : 'All Crops'}</span>
                  <i className={`fas fa-chevron-${cropDropdownOpen ? 'up' : 'down'}`}></i>
                </button>
                
                {cropDropdownOpen && (
                  <div className="absolute z-50 mt-1 w-full bg-slate-800 border border-slate-600 rounded-lg shadow-xl max-h-60 overflow-auto">
                    <input
                      type="text"
                      placeholder="Search crops..."
                      value={cropSearchText}
                      onChange={(e) => setCropSearchText(e.target.value)}
                      className="w-full border-b border-slate-600 px-4 py-2 bg-slate-700 text-white placeholder-slate-400"
                    />
                    <div className="p-2">
                      {filteredCrops.map((commodity) => (
                        <div
                          key={commodity}
                          className={`flex items-center p-2 rounded cursor-pointer hover:bg-slate-700 ${
                            selectedCrops.includes(commodity) ? 'bg-emerald-600/20' : ''
                          }`}
                          onClick={() => {
                            if (selectedCrops.includes(commodity)) {
                              removeCrop(commodity);
                            } else {
                              addCrop(commodity);
                            }
                          }}
                        >
                          <span className="mr-2 text-xl">{cropEmojis[commodity] || '🌱'}</span>
                          <span className="text-white">{commodity}</span>
                          {selectedCrops.includes(commodity) && (
                            <i className="fas fa-check ml-auto text-emerald-400"></i>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
              <i className="fas fa-exclamation-triangle text-red-400 text-2xl mb-2"></i>
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {!loading && !error && Object.keys(groupedPrices).length === 0 && (
            <div className="text-center py-20">
              <i className="fas fa-search text-slate-400 text-4xl mb-4"></i>
              <p className="text-slate-400 text-xl">No prices found for selected filters</p>
            </div>
          )}

          {!loading && !error && Object.keys(groupedPrices).map((commodity) => (
            <div key={commodity} className="mb-8">
              <div className="flex items-center mb-4">
                <span className="text-3xl mr-3">{cropEmojis[commodity] || '🌱'}</span>
                <h2 className="text-2xl font-bold text-white">{commodity}</h2>
                <span className="ml-2 text-slate-400">({groupedPrices[commodity].length} markets)</span>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {groupedPrices[commodity].map((item, index) => (
                  <div key={index} className="bg-slate-800/50 backdrop-blur-sm rounded-xl p-4 border border-slate-700 hover:border-emerald-500 transition-all duration-300 hover:shadow-lg">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h3 className="font-bold text-white">{item.market}</h3>
                        <p className="text-sm text-slate-400">{item.district}, {item.state}</p>
                      </div>
                    <div className="text-right">
                        <div className="text-2xl font-bold text-emerald-400">₹{item.modal_price}</div>
                        <div className="text-xs text-slate-400">per quintal</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-center">
                      <div>
                        <div className="text-sm text-slate-400">Min</div>
                        <div className="font-semibold text-green-400">₹{item.min_price}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Max</div>
                        <div className="font-semibold text-red-400">₹{item.max_price}</div>
                      </div>
                      <div>
                        <div className="text-sm text-slate-400">Avg</div>
                        <div className="font-semibold text-amber-400">₹{Math.round((item.min_price + item.max_price) / 2)}</div>
                      </div>
                    </div>

                    <div className="mt-3 pt-3 border-t border-slate-700">
                      <div className="flex justify-between text-xs text-slate-400">
                        <span>{item.variety}</span>
                        <span>{item.grade}</span>
                        <span>{item.arrival_date}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 bg-slate-800/30">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-emerald-400">{prices.length}</div>
              <div className="text-slate-400">Markets</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-amber-400">{Object.keys(groupedPrices).length}</div>
              <div className="text-slate-400">Commodities</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-400">{districts.length}</div>
              <div className="text-slate-400">Districts</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">Live</div>
              <div className="text-slate-400">Updates</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default MandiPrice;
