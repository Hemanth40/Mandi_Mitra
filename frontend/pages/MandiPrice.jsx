import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
  const [state, setState] = useState('Delhi');
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
    <div className="min-h-screen w-full bg-amber-100 m-0 p-0">
      {/* Sticky Navigation Bar */}
      <header className="bg-white/30 backdrop-blur-lg rounded-full p-2 shadow-lg sticky top-0 z-50 max-w-5xl mx-auto px-2 mt-2">
        <div className="px-2 sm:px-4 lg:px-6 flex justify-between items-center min-h-0 w-full">
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

      {/* Crop Selection Dropdown below header */}
      <div className="max-w-7xl mx-auto px-4 mt-4 relative">
        <button
          onClick={toggleCropSelection}
          className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition font-medium"
          aria-haspopup="listbox"
          aria-expanded={cropDropdownOpen}
        >
          {selectedCrops.length > 0 ? `Selected Crops (${selectedCrops.length})` : 'Select Crops'}
          <span className="ml-2">{cropDropdownOpen ? '▲' : '▼'}</span>
        </button>
        {cropDropdownOpen && (
          <div className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <input
              type="text"
              placeholder="Search crops..."
              value={cropSearchText}
              onChange={(e) => setCropSearchText(e.target.value)}
              className="w-full border-b border-amber-300 px-3 py-2 focus:outline-none"
            />
            <ul role="listbox" className="max-h-60 overflow-auto">
              {filteredCrops.length === 0 && (
                <li className="px-4 py-2 text-gray-500">No crops found</li>
              )}
              {filteredCrops.map((commodity) => (
                <li
                  key={commodity}
                  className={`cursor-pointer select-none relative py-2 pl-10 pr-4 hover:bg-amber-100 ${
                    selectedCrops.includes(commodity) ? 'font-semibold text-amber-900 bg-amber-200' : 'text-gray-900'
                  }`}
                  onClick={() => {
                    if (selectedCrops.includes(commodity)) {
                      removeCrop(commodity);
                    } else {
                      addCrop(commodity);
                    }
                  }}
                  role="option"
                  aria-selected={selectedCrops.includes(commodity)}
                >
                  <span className="absolute left-3 top-2 text-2xl">{cropEmojis[commodity] || '🌱'}</span>
                  {commodity}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <main className="max-w-7xl mx-auto py-12 px-4 flex flex-col md:flex-row gap-8">
        {/* Left Column: Filters and Price Listings */}
        <section className="flex-1">
          <h1 className="text-3xl font-bold text-amber-900 mb-6 font-serif">Mandi Prices</h1>

          {/* Search and Filters */}
          <div className="mb-6 space-y-4">
            <input
              type="text"
              placeholder="Search mandi, crop, state, district..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              className="w-full border border-amber-300 rounded p-2"
            />

            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col">
                <label htmlFor="state" className="mb-1 font-medium text-amber-700">Select State:</label>
                <select
                  id="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="border border-amber-300 rounded p-2"
                >
                  {allStatesIndia.map((st) => (
                    <option key={st} value={st}>{st}</option>
                  ))}
                </select>
              </div>

              {districts.length > 0 && (
                <div className="flex flex-col">
                  <label htmlFor="district" className="mb-1 font-medium text-amber-700">Select District:</label>
                  <select
                    id="district"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                    className="border border-amber-300 rounded p-2"
                  >
                    <option value="">All Districts</option>
                    {districts.map((dist) => (
                      <option key={dist} value={dist}>{dist}</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="flex flex-col">
                <label htmlFor="sort" className="mb-1 font-medium text-amber-700">Sort By Price:</label>
                <select
                  id="sort"
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="border border-amber-300 rounded p-2"
                >
                  <option value="modal_price">Modal Price</option>
                  <option value="min_price">Min Price</option>
                  <option value="max_price">Max Price</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={resetFilters}
                  className="bg-amber-600 text-white px-4 py-2 rounded hover:bg-amber-700 transition"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Price Listings as Tables */}
          <div className="bg-white p-6 rounded-xl shadow-md overflow-x-auto">
            {loading && <div>Loading prices...</div>}
            {error && <div className="text-red-500">{error}</div>}

            {!loading && !error && filteredPrices.length === 0 && (
              <div>No prices available for selected filters.</div>
            )}

            {!loading && !error && Object.keys(groupedPrices).map((commodity) => (
              <div key={commodity} className="mb-8">
                <h2 className="text-xl font-semibold text-amber-900 mb-2 flex items-center gap-2">
                  <span className="text-3xl">{cropEmojis[commodity] || '🌱'}</span> {commodity} ({groupedPrices[commodity].length} entries)
                </h2>
                <table className="min-w-full border border-amber-300 rounded-md overflow-hidden">
                  <thead className="bg-amber-200 text-amber-900 font-semibold">
                    <tr>
                      <th className="border border-amber-300 px-3 py-1 text-left">State</th>
                      <th className="border border-amber-300 px-3 py-1 text-left">District</th>
                      <th className="border border-amber-300 px-3 py-1 text-left">Market</th>
                      <th className="border border-amber-300 px-3 py-1 text-left">Variety</th>
                      <th className="border border-amber-300 px-3 py-1 text-left">Grade</th>
                      <th className="border border-amber-300 px-3 py-1 text-left">Arrival Date</th>
                      <th className="border border-amber-300 px-3 py-1 text-right">Min Price</th>
                      <th className="border border-amber-300 px-3 py-1 text-right">Max Price</th>
                      <th className="border border-amber-300 px-3 py-1 text-right">Modal Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    {groupedPrices[commodity].map((item, index) => (
                      <tr key={index} className="even:bg-amber-50">
                        <td className="border border-amber-300 px-3 py-1">{item.state}</td>
                        <td className="border border-amber-300 px-3 py-1">{item.district}</td>
                        <td className="border border-amber-300 px-3 py-1">{item.market}</td>
                        <td className="border border-amber-300 px-3 py-1">{item.variety}</td>
                        <td className="border border-amber-300 px-3 py-1">{item.grade}</td>
                        <td className="border border-amber-300 px-3 py-1">{item.arrival_date}</td>
                        <td className="border border-amber-300 px-3 py-1 text-right">{item.min_price}</td>
                        <td className="border border-amber-300 px-3 py-1 text-right">{item.max_price}</td>
                        <td className="border border-amber-300 px-3 py-1 text-right font-medium text-amber-700">{item.modal_price}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default MandiPrice;
