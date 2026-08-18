import React, { useEffect, useState } from 'react';
import Navigation from '../src/components/Navigation';
import { API_BASE_URL } from '../src/config';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.2090, name: 'Delhi NCR' });
  const [searchQuery, setSearchQuery] = useState('');

  const quickCities = [
    { name: 'Delhi', lat: 28.6139, lon: 77.2090 },
    { name: 'Lucknow', lat: 26.8467, lon: 80.9462 },
    { name: 'Chandigarh', lat: 30.7333, lon: 76.7794 },
    { name: 'Mumbai', lat: 19.0760, lon: 72.8777 },
    { name: 'Bengaluru', lat: 12.9716, lon: 77.5946 },
    { name: 'Hyderabad', lat: 17.3850, lon: 78.4867 },
    { name: 'Jaipur', lat: 26.9124, lon: 75.7873 },
    { name: 'Patna', lat: 25.5941, lon: 85.1376 },
  ];

  const formatDate = (dateString) => {
    const options = { weekday: 'short', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-IN', options);
  };

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      0: '☀️',
      1: '🌤️',
      2: '⛅',
      3: '☁️',
      45: '🌫️',
      48: '🌫️',
      51: '🌦️',
      53: '🌧️',
      55: '🌧️',
      61: '🌧️',
      63: '🌧️',
      65: '⛈️',
      71: '🌨️',
      95: '⛈️',
      96: '⛈️',
      99: '⛈️',
    };
    return icons[weatherCode] || '🌤️';
  };

  const getWeatherDescription = (weatherCode) => {
    const descriptions = {
      0: 'Clear Sky (Optimal Sun)',
      1: 'Mainly Clear',
      2: 'Partly Cloudy',
      3: 'Overcast Cloud Cover',
      45: 'Dense Fog',
      51: 'Light Drizzle',
      53: 'Moderate Drizzle',
      61: 'Scattered Rain',
      63: 'Moderate Rain Shower',
      65: 'Heavy Precipitation',
      95: 'Thunderstorm Active',
      96: 'Thunderstorm with Hail',
    };
    return descriptions[weatherCode] || 'Partly Cloudy';
  };

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        fetchWeather(location.lat, location.lon, 'Delhi NCR');
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude, name: 'Your Location (GPS)' });
          fetchWeather(latitude, longitude, 'Your Location (GPS)');
        },
        () => {
          fetchWeather(location.lat, location.lon, 'Delhi NCR');
        }
      );
    };

    getLocation();
  }, []);

  const fetchWeather = async (lat, lon, name = '') => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/weather/current?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);
      if (name) setLocation({ lat, lon, name });
      setError(null);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    const query = searchQuery.trim().toLowerCase();
    const found = quickCities.find(c => c.name.toLowerCase().includes(query));
    if (found) {
      fetchWeather(found.lat, found.lon, found.name);
    } else {
      // Default fallback search
      fetchWeather(28.6139, 77.2090, searchQuery);
    }
  };

  const getUVIndexLevel = (uvIndex = 0) => {
    if (uvIndex >= 8) return { level: 'Very High', color: 'text-red-400', bg: 'bg-red-500/10' };
    if (uvIndex >= 6) return { level: 'High', color: 'text-orange-400', bg: 'bg-orange-500/10' };
    if (uvIndex >= 3) return { level: 'Moderate', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    return { level: 'Low (Safe)', color: 'text-green-400', bg: 'bg-green-500/10' };
  };

  // Farmer Spraying Window Advice calculation
  const getSprayingAdvisory = () => {
    const windSpeed = weatherData?.hourly?.windspeed_10m?.[0] || 0;
    const precip = weatherData?.hourly?.precipitation?.[0] || 0;

    if (precip > 0.5) {
      return { status: 'Poor (Rain Warning)', desc: 'High chance of wash-off due to precipitation.', color: 'text-red-400', bg: 'bg-red-500/10' };
    }
    if (windSpeed > 18) {
      return { status: 'Poor (High Drift)', desc: 'Wind speed >18 km/h causes chemical drift.', color: 'text-amber-400', bg: 'bg-amber-500/10' };
    }
    return { status: 'Optimal Spray Window', desc: 'Low wind and clear skies. Ideal for pesticide/fertilizer spray.', color: 'text-emerald-400', bg: 'bg-emerald-500/10' };
  };

  return (
    <div className="min-h-screen bg-[#090d16] text-slate-100 selection:bg-blue-500 selection:text-white">
      <Navigation />

      {/* Hero Section with Dramatic Farmland Skies */}
      <section className="relative py-16 px-4 overflow-hidden border-b border-slate-800">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1534088568595-a066f410bcda?w=1600&auto=format&fit=crop&q=80')`
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-[#090d16]/85 to-[#090d16]/60"></div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <span className="inline-flex items-center space-x-2 px-3.5 py-1.5 bg-blue-500/10 border border-blue-500/30 text-blue-400 text-xs font-bold rounded-full mb-4">
            <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
            <span>🛰️ Open-Meteo High-Precision Agro Radar</span>
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 tracking-tight">
            Agricultural Weather & 7-Day Forecast
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto mb-8 leading-relaxed">
            Hyper-local GPS weather forecasting, precipitation probabilities, agricultural spraying windows, and soil moisture conditions.
          </p>

          {/* City Quick Picks */}
          <div className="flex flex-wrap justify-center gap-2 max-w-2xl mx-auto">
            {quickCities.map((c) => (
              <button
                key={c.name}
                onClick={() => fetchWeather(c.lat, c.lon, c.name)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
                  location.name === c.name
                    ? 'bg-blue-600 text-white border-blue-500 shadow-md'
                    : 'bg-slate-900/80 hover:bg-slate-800 text-slate-300 border-slate-700'
                }`}
              >
                📍 {c.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Main Weather Dashboard */}
      <section className="py-10 px-4 max-w-7xl mx-auto">
        {loading && (
          <div className="text-center py-24 bg-slate-900/60 rounded-3xl border border-slate-800">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-blue-500 border-t-transparent mb-4"></div>
            <p className="text-slate-300 text-lg font-medium">Fetching satellite telemetry for {location.name}...</p>
          </div>
        )}

        {error && !loading && (
          <div className="bg-red-950/60 border border-red-800/80 rounded-2xl p-6 text-center max-w-2xl mx-auto">
            <i className="fas fa-exclamation-triangle text-red-400 text-3xl mb-3"></i>
            <h3 className="text-lg font-bold text-red-300 mb-1">{error}</h3>
            <p className="text-slate-400 text-sm">Please select one of the major cities above to reload.</p>
          </div>
        )}

        {weatherData && !loading && (
          <div className="space-y-8 animate-fadeIn">
            {/* Top Primary Meteorological Card */}
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
                
                {/* Current Temperature & Icon */}
                <div className="flex items-center space-x-6 lg:border-r lg:border-slate-800 lg:pr-8">
                  <div className="text-6xl sm:text-7xl p-4 bg-slate-950/80 rounded-3xl border border-slate-800 shadow-inner">
                    {getWeatherIcon(weatherData.current_weather?.weathercode)}
                  </div>
                  <div>
                    <span className="text-xs font-bold text-blue-400 uppercase tracking-widest">
                      📍 {location.name}
                    </span>
                    <div className="text-5xl sm:text-6xl font-black text-white tracking-tighter">
                      {Math.round(weatherData.current_weather?.temperature ?? 28)}°C
                    </div>
                    <p className="text-sm font-semibold text-slate-300 mt-1">
                      {getWeatherDescription(weatherData.current_weather?.weathercode)}
                    </p>
                  </div>
                </div>

                {/* Agro-Advisory Window Banner */}
                <div className="lg:col-span-2 bg-slate-950/80 rounded-2xl p-5 border border-slate-800/80 flex flex-col justify-between">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-slate-400">🚜 Agricultural Action Advisory</span>
                      <h4 className={`text-lg font-extrabold ${getSprayingAdvisory().color} mt-0.5`}>
                        {getSprayingAdvisory().status}
                      </h4>
                    </div>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getSprayingAdvisory().bg} ${getSprayingAdvisory().color} border-current`}>
                      Farm Spray Advisory
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                    {getSprayingAdvisory().desc}
                  </p>

                  <div className="grid grid-cols-3 gap-2 text-center text-xs">
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Relative Humidity</div>
                      <div className="text-sm font-bold text-white mt-0.5">{weatherData.hourly?.relativehumidity_2m?.[0] ?? 65}%</div>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">Wind Speed</div>
                      <div className="text-sm font-bold text-white mt-0.5">{weatherData.hourly?.windspeed_10m?.[0] ?? 8} km/h</div>
                    </div>
                    <div className="bg-slate-900/90 p-2.5 rounded-xl border border-slate-800">
                      <div className="text-slate-400 text-[10px] uppercase font-bold">UV Solar Index</div>
                      <div className="text-sm font-bold text-amber-400 mt-0.5">{weatherData.hourly?.uv_index?.[0] ?? 4.5}</div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 7-Day Agricultural Forecast Grid */}
            <div>
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">7-Day Farming Outlook</h3>
                  <p className="text-xs text-slate-400">Daily rainfall estimation and temperature ranges for irrigation planning</p>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
                {weatherData.daily?.time?.slice(0, 7).map((date, idx) => {
                  const maxT = Math.round(weatherData.daily?.temperature_2m_max?.[idx] ?? 32);
                  const minT = Math.round(weatherData.daily?.temperature_2m_min?.[idx] ?? 22);
                  const rainSum = weatherData.daily?.precipitation_sum?.[idx] ?? 0;
                  const wCode = weatherData.daily?.weathercode?.[idx];

                  return (
                    <div
                      key={date}
                      className="bg-slate-900/70 backdrop-blur-md rounded-2xl p-4 border border-slate-800 hover:border-blue-500/50 transition-all duration-200 text-center flex flex-col justify-between"
                    >
                      <div>
                        <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                          {formatDate(date)}
                        </span>
                        <div className="text-4xl my-3">{getWeatherIcon(wCode)}</div>
                        <div className="text-xs font-semibold text-slate-300 leading-tight mb-2">
                          {getWeatherDescription(wCode).split(' ')[0]}
                        </div>
                      </div>

                      <div className="pt-3 border-t border-slate-800/80 space-y-1 text-xs">
                        <div className="flex justify-between">
                          <span className="text-slate-400">High:</span>
                          <b className="text-white">{maxT}°C</b>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Low:</span>
                          <b className="text-slate-300">{minT}°C</b>
                        </div>
                        <div className="flex justify-between text-blue-400">
                          <span>Rain:</span>
                          <b>{rainSum} mm</b>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Farm Environmental Telemetry Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              {/* Solar Radiation & UV Index */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <i className="fas fa-sun"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Solar Radiation & UV</h4>
                    <span className="text-xs text-slate-400">Crop photosynthesis status</span>
                  </div>
                </div>

                <div className="text-center py-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-4">
                  <div className="text-3xl font-black text-amber-400">
                    {weatherData.hourly?.uv_index?.[0] ?? 5.2} UV
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).color}`}>
                    {getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).level} Exposure
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Moderate to high UV promotes vigorous flowering in crops like tomatoes and chillies.
                </p>
              </div>

              {/* Wind Speed & Aeration */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400">
                    <i className="fas fa-wind"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Wind Velocity & Drift</h4>
                    <span className="text-xs text-slate-400">Pollination & lodging risk</span>
                  </div>
                </div>

                <div className="text-center py-4 bg-slate-950/80 rounded-2xl border border-slate-800 mb-4">
                  <div className="text-3xl font-black text-blue-400">
                    {weatherData.hourly?.windspeed_10m?.[0] ?? 12} km/h
                  </div>
                  <span className="text-xs text-slate-400 font-semibold">
                    Direction: {weatherData.hourly?.winddirection_10m?.[0] ?? 180}°
                  </span>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calm winds ensure safe spraying of foliar nutrients without pesticide drift.
                </p>
              </div>

              {/* Day & Night Cycle */}
              <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-3xl p-6 shadow-xl">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h4 className="font-bold text-white text-base">Day / Night Cycle</h4>
                    <span className="text-xs text-slate-400">Photoperiod & dew duration</span>
                  </div>
                </div>

                <div className="space-y-3 bg-slate-950/80 rounded-2xl p-4 border border-slate-800 mb-4">
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center space-x-2">
                      <i className="fas fa-sun text-amber-400"></i>
                      <span>Sunrise</span>
                    </span>
                    <b className="text-white">
                      {weatherData.daily?.sunrise?.[0] ? new Date(weatherData.daily.sunrise[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '05:48 AM'}
                    </b>
                  </div>
                  <div className="flex justify-between items-center text-xs">
                    <span className="text-slate-400 flex items-center space-x-2">
                      <i className="fas fa-moon text-blue-400"></i>
                      <span>Sunset</span>
                    </span>
                    <b className="text-white">
                      {weatherData.daily?.sunset?.[0] ? new Date(weatherData.daily.sunset[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : '06:52 PM'}
                    </b>
                  </div>
                </div>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Morning hours immediately following sunrise are optimal for field irrigation.
                </p>
              </div>

            </div>
          </div>
        )}
      </section>
    </div>
  );
};

export default WeatherForecast;
