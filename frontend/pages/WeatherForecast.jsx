import React, { useEffect, useState } from 'react';
import Navigation from '../src/components/Navigation';
import { API_BASE_URL } from '../src/config';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 28.6139, lon: 77.2090 });
  const [searchQuery, setSearchQuery] = useState('');

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getWeatherIcon = (weatherCode) => {
    const icons = {
      0: '☀️',  // Clear sky
      1: '🌤️',  // Mainly clear
      2: '⛅',   // Partly cloudy
      3: '☁️',   // Overcast
      45: '🌫️',  // Fog
      48: '🌫️',  // Depositing rime fog
      51: '🌦️',  // Light drizzle
      53: '🌧️',  // Moderate drizzle
      55: '🌧️',  // Dense drizzle
      61: '🌧️',  // Slight rain
      63: '🌧️',  // Moderate rain
      65: '⛈️',  // Heavy rain
      71: '🌨️',  // Slight snow
      73: '🌨️',  // Moderate snow
      75: '❄️',  // Heavy snow
      95: '⛈️',  // Thunderstorm
      96: '⛈️',  // Thunderstorm with hail
      99: '⛈️',  // Thunderstorm with heavy hail
    };
    return icons[weatherCode] || '🌤️';
  };

  const getWeatherDescription = (weatherCode) => {
    const descriptions = {
      0: 'Clear sky',
      1: 'Mainly clear',
      2: 'Partly cloudy',
      3: 'Overcast',
      45: 'Foggy',
      48: 'Fog with rime',
      51: 'Light drizzle',
      53: 'Moderate drizzle',
      55: 'Dense drizzle',
      61: 'Light rain',
      63: 'Moderate rain',
      65: 'Heavy rain',
      71: 'Light snow',
      73: 'Moderate snow',
      75: 'Heavy snow',
      95: 'Thunderstorm',
      96: 'Thunderstorm with hail',
      99: 'Heavy thunderstorm',
    };
    return descriptions[weatherCode] || 'Partly cloudy';
  };

  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported, using default location');
        fetchWeather(location.lat, location.lon);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation({ lat: latitude, lon: longitude });
          fetchWeather(latitude, longitude);
        },
        (err) => {
          console.error('Geolocation error:', err);
          fetchWeather(location.lat, location.lon);
        }
      );
    };

    getLocation();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_BASE_URL}/api/weather/current?lat=${lat}&lon=${lon}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      setWeatherData(data);
      setError(null);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const handleLocationSearch = (e) => {
    e.preventDefault();
    // For demo purposes, using predefined coordinates
    const locations = {
      'delhi': { lat: 28.6139, lon: 77.2090 },
      'mumbai': { lat: 19.0760, lon: 72.8777 },
      'bangalore': { lat: 12.9716, lon: 77.5946 },
      'chennai': { lat: 13.0827, lon: 80.2707 },
      'kolkata': { lat: 22.5726, lon: 88.3639 },
    };

    const query = searchQuery.toLowerCase();
    if (locations[query]) {
      setLocation(locations[query]);
      fetchWeather(locations[query].lat, locations[query].lon);
    }
  };

  const getUVIndexLevel = (uvIndex) => {
    if (uvIndex === undefined) return { level: 'N/A', color: 'text-gray-500', bg: 'bg-gray-100' };
    if (uvIndex >= 8) return { level: 'Very High', color: 'text-red-600', bg: 'bg-red-100' };
    if (uvIndex >= 6) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100' };
    if (uvIndex >= 3) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getUVIndexColor = (uvIndex) => {
    if (uvIndex === undefined) return 'bg-gray-500';
    if (uvIndex >= 8) return 'bg-red-500';
    if (uvIndex >= 6) return 'bg-orange-500';
    if (uvIndex >= 3) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />

      {/* Hero Section */}
      <section className="relative h-96 flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
        <div className="absolute inset-0 bg-black/30"></div>
        <div className="relative z-10 text-center px-4">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">Weather Forecast</h1>
          <p className="text-xl text-white/90 max-w-2xl mx-auto">
            Real-time weather updates for your farming needs
          </p>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleLocationSearch} className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Search city (Delhi, Mumbai, Bangalore...)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Weather Content */}
      <section className="py-8 px-4">
        <div className="max-w-7xl mx-auto">
          {loading && (
            <div className="flex justify-center items-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
            </div>
          )}

          {error && (
            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-6 text-center">
              <i className="fas fa-exclamation-triangle text-red-400 text-2xl mb-2"></i>
              <p className="text-red-300">{error}</p>
            </div>
          )}

          {weatherData && (
            <>
              {/* Current Weather */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700 mb-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div>
                    <h2 className="text-3xl font-bold text-white mb-4">Current Weather</h2>
                    <div className="space-y-6">
                      <div className="flex items-center justify-between p-6 bg-slate-700/50 rounded-xl">
                        <div>
                          <p className="text-sm text-slate-300">Temperature</p>
                          <p className="text-4xl font-bold text-white">{weatherData.current_weather?.temperature ?? 'N/A'}°C</p>
                        </div>
                        <div className="text-6xl">
                          {getWeatherIcon(weatherData.current_weather?.weathercode)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="p-4 bg-slate-700/50 rounded-xl">
                          <i className="fas fa-tint text-blue-400 mb-2"></i>
                          <p className="text-sm text-slate-300">Humidity</p>
                          <p className="text-xl font-bold text-white">{weatherData.hourly?.relativehumidity_2m?.[0] ?? 'N/A'}%</p>
                        </div>
                        <div className="p-4 bg-slate-700/50 rounded-xl">
                          <i className="fas fa-cloud-rain text-blue-400 mb-2"></i>
                          <p className="text-sm text-slate-300">Precipitation</p>
                          <p className="text-xl font-bold text-white">{weatherData.hourly?.precipitation?.[0] ?? 'N/A'} mm</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-2xl font-bold text-white mb-4">Details</h3>
                    <div className="space-y-4">
                      <div className="p-4 bg-slate-700/50 rounded-xl">
                        <i className="fas fa-wind text-blue-400 mb-2"></i>
                        <p className="text-sm text-slate-300">Wind Speed</p>
                        <p className="text-xl font-bold text-white">{weatherData.hourly?.windspeed_10m?.[0] ?? 'N/A'} km/h</p>
                      </div>

                      <div className="p-4 bg-slate-700/50 rounded-xl">
                        <i className="fas fa-compass text-blue-400 mb-2"></i>
                        <p className="text-sm text-slate-300">Wind Direction</p>
                        <p className="text-xl font-bold text-white">{weatherData.hourly?.winddirection_10m?.[0] ?? 'N/A'}°</p>
                      </div>

                      <div className="p-4 bg-slate-700/50 rounded-xl">
                        <i className="fas fa-sun text-yellow-400 mb-2"></i>
                        <p className="text-sm text-slate-300">UV Index</p>
                        <div className="flex items-center justify-between">
                          <p className="text-xl font-bold text-white">{weatherData.hourly?.uv_index?.[0] ?? 'N/A'}</p>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).bg} ${getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).color}`}>
                            {getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).level}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 7-Day Forecast */}
              <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700">
                <h2 className="text-3xl font-bold text-white mb-6">7-Day Forecast</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {weatherData.daily?.time?.map((date, index) => (
                    <div key={date} className="bg-slate-700/50 rounded-xl p-6 border border-slate-600 hover:border-blue-500 transition">
                      <p className="text-sm text-slate-300 mb-2">{formatDate(date)}</p>
                      <div className="text-4xl mb-2 text-center">
                        {getWeatherIcon(weatherData.daily?.weathercode?.[index])}
                      </div>
                      <p className="text-sm text-slate-300 mb-3 text-center">
                        {getWeatherDescription(weatherData.daily?.weathercode?.[index])}
                      </p>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-300">Max:</span>
                          <span className="text-white font-bold">{weatherData.daily?.temperature_2m_max?.[index]}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-300">Min:</span>
                          <span className="text-white font-bold">{weatherData.daily?.temperature_2m_min?.[index]}°C</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-slate-300">Rain:</span>
                          <span className="text-white font-bold">{weatherData.daily?.precipitation_sum?.[index]} mm</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Additional Weather Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
                {/* Sunrise/Sunset */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4">Sun & Moon</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-sun text-yellow-400 text-xl"></i>
                        <span className="text-slate-300">Sunrise</span>
                      </div>
                      <span className="text-white font-bold">
                        {new Date(weatherData.daily?.sunrise?.[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-moon text-blue-400 text-xl"></i>
                        <span className="text-slate-300">Sunset</span>
                      </div>
                      <span className="text-white font-bold">
                        {new Date(weatherData.daily?.sunset?.[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Wind & Gusts */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4">Wind Conditions</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-wind text-blue-400 text-xl"></i>
                        <span className="text-slate-300">Wind Speed</span>
                      </div>
                      <span className="text-white font-bold">{weatherData.hourly?.windspeed_10m?.[0]} km/h</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <i className="fas fa-compass text-blue-400 text-xl"></i>
                        <span className="text-slate-300">Direction</span>
                      </div>
                      <span className="text-white font-bold">{weatherData.hourly?.winddirection_10m?.[0]}°</span>
                    </div>
                  </div>
                </div>

                {/* UV Index */}
                <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-6 border border-slate-700">
                  <h3 className="text-xl font-bold text-white mb-4">UV Index</h3>
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-white mb-2">
                        {weatherData.hourly?.uv_index?.[0]}
                      </div>
                      <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).bg} ${getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).color}`}>
                        {getUVIndexLevel(weatherData.hourly?.uv_index?.[0]).level}
                      </div>
                    </div>
                    <div className="w-full bg-slate-600 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full transition-all duration-500 ${getUVIndexColor(weatherData.hourly?.uv_index?.[0])}`}
                        style={{ width: `${Math.min(((weatherData.hourly?.uv_index?.[0] || 0) / 11) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default WeatherForecast;
