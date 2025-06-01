import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

const WeatherForecast = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const formatDate = (dateString) => {
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getWeatherIcon = (temp, precipitation) => {
    if (precipitation > 5) return 'fa-cloud-showers-heavy text-blue-500';
    if (precipitation > 0) return 'fa-cloud-rain text-blue-400';
    if (temp > 30) return 'fa-sun text-yellow-500';
    if (temp > 20) return 'fa-cloud-sun text-yellow-400';
    return 'fa-cloud text-gray-400';
  };


  useEffect(() => {
    const getLocation = () => {
      if (!navigator.geolocation) {
        console.log('Geolocation not supported, using default location');
        // Default to New Delhi coordinates
        fetchWeather(28.6139, 77.2090);
        return;
      }

      const options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      const locationTimeout = setTimeout(() => {
        console.log('Location request timed out, using default location');
        fetchWeather(28.6139, 77.2090); // Default to New Delhi coordinates
      }, 6000);

      navigator.geolocation.getCurrentPosition(
        (position) => {
          clearTimeout(locationTimeout);
          const { latitude, longitude } = position.coords;
          console.log('Location obtained:', { latitude, longitude });
          fetchWeather(latitude, longitude);
        },
        (err) => {
          clearTimeout(locationTimeout);
          console.error('Geolocation error:', err);
          let errorMessage = 'Using default location. ';
          switch (err.code) {
            case err.PERMISSION_DENIED:
              errorMessage += 'Location access was denied.';
              break;
            case err.POSITION_UNAVAILABLE:
              errorMessage += 'Location information was unavailable.';
              break;
            case err.TIMEOUT:
              errorMessage += 'Location request timed out.';
              break;
            default:
              errorMessage += err.message;
          }
          console.log(errorMessage);
          // Default to New Delhi coordinates
          fetchWeather(28.6139, 77.2090);
        },
        options
      );
    };

    getLocation();
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      console.log(`Fetching weather data for coordinates: ${lat}, ${lon}`);
      const response = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Weather API Error:', errorText);
        throw new Error(`Failed to fetch weather data: ${response.statusText}`);
      }

      const data = await response.json();
      if (data.error) {
        console.error('Weather API Error:', data.error);
        throw new Error(data.error);
      }

      console.log('Weather data fetched successfully:', data);
      setWeatherData(data);
      setError(null); // Clear any previous errors
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError(err.message);
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen w-full bg-amber-100 m-0 p-0">
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

      {/* Weather Content */}
      <main className="min-h-screen p-8 max-w-5xl mx-auto">
        <h1 className="text-5xl font-bold text-amber-900 mb-8 font-serif">Weather Forecast</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {weatherData ? (
          <>
            {/* Current Weather Card */}
            <section className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mb-8 overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
                <h2 className="text-3xl font-bold mb-2">Current Weather</h2>
                <p className="text-amber-100">Updated as of {new Date().toLocaleTimeString()}</p>
              </div>
              
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div>
                        <p className="text-sm text-amber-600 font-medium">Temperature</p>
                        <p className="text-3xl font-bold text-amber-900">{weatherData.current_weather?.temperature ?? 'N/A'}°C</p>
                      </div>
                      <i className={`fas fa-3x ${getWeatherIcon(weatherData.current_weather?.temperature, weatherData.hourly?.precipitation?.[0])}`}></i>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <i className="fas fa-tint text-amber-600 mb-2"></i>
                        <p className="text-sm text-gray-600">Humidity</p>
                        <p className="text-xl font-bold text-amber-900">{weatherData.hourly?.relativehumidity_2m?.[0] ?? 'N/A'}%</p>
                      </div>
                      <div className="p-4 bg-amber-50 rounded-lg">
                        <i className="fas fa-cloud-rain text-amber-700 mb-2"></i>
                        <p className="text-sm text-gray-600">Precipitation</p>
                        <p className="text-xl font-bold text-amber-900">{weatherData.hourly?.precipitation?.[0] ?? 'N/A'} mm</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="fas fa-wind text-gray-500 mb-2"></i>
                        <p className="text-sm text-gray-600">Wind Speed</p>
                        <p className="text-xl font-bold text-gray-900">{weatherData.hourly?.windspeed_10m?.[0] ?? 'N/A'} kph</p>
                      </div>
                      <div className="p-4 bg-gray-50 rounded-lg">
                        <i className="fas fa-compass text-gray-700 mb-2"></i>
                        <p className="text-sm text-gray-600">Wind Direction</p>
                        <p className="text-xl font-bold text-gray-900">{weatherData.hourly?.winddirection_10m?.[0] ?? 'N/A'}°</p>
                      </div>
                    </div>
                    
                    <div className="p-4 bg-amber-50 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <div>
                          <i className="fas fa-sun text-amber-500 mr-2"></i>
                          <span className="text-sm text-amber-700">UV Index</span>
                        </div>
                        <div className="flex items-center">
                          <span className="text-xl font-bold text-amber-900 mr-2">{weatherData.hourly?.uv_index?.[0] ?? 'N/A'}</span>
                          <span className="text-sm font-medium px-2 py-1 rounded-full" style={{
                            backgroundColor: (() => {
                              const uv = weatherData.hourly?.uv_index?.[0];
                              if (uv === undefined) return 'rgb(209 213 219)';
                              if (uv >= 8) return 'rgb(220 38 38)';
                              if (uv >= 6) return 'rgb(234 88 12)';
                              if (uv >= 3) return 'rgb(234 179 8)';
                              return 'rgb(34 197 94)';
                            })(),
                            color: 'white'
                          }}>
                            {(() => {
                              const uv = weatherData.hourly?.uv_index?.[0];
                              if (uv === undefined) return 'N/A';
                              if (uv >= 8) return 'Very High';
                              if (uv >= 6) return 'High';
                              if (uv >= 3) return 'Moderate';
                              return 'Low';
                            })()}
                          </span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="h-2.5 rounded-full transition-all duration-500"
                          style={{ 
                            width: `${((weatherData.hourly?.uv_index?.[0] || 0) / 11 * 100)}%`,
                            backgroundColor: (() => {
                              const uv = weatherData.hourly?.uv_index?.[0];
                              if (uv === undefined) return 'rgb(209 213 219)';
                              if (uv >= 8) return 'rgb(220 38 38)';
                              if (uv >= 6) return 'rgb(234 88 12)';
                              if (uv >= 3) return 'rgb(234 179 8)';
                              return 'rgb(34 197 94)';
                            })()
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* 3-Day Forecast */}
            <section className="mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">3-Day Forecast</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {weatherData.daily?.time?.map((date, index) => (
                  <div key={date} className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
                    <div className="bg-gradient-to-r from-gray-100 to-gray-50 px-6 py-4 border-b">
                      <p className="font-semibold text-gray-900">{formatDate(date)}</p>
                    </div>
                    <div className="p-6 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-red-600"><i className="fas fa-thermometer-full mr-2"></i>Max</p>
                          <p className="text-2xl font-bold text-gray-900">{weatherData.daily?.temperature_2m_max?.[index] ?? 'N/A'}°C</p>
                        </div>
                        <div className="text-right">
                          <p className="text-blue-600"><i className="fas fa-thermometer-empty mr-2"></i>Min</p>
                          <p className="text-2xl font-bold text-gray-900">{weatherData.daily?.temperature_2m_min?.[index] ?? 'N/A'}°C</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <i className="fas fa-cloud-showers-heavy text-blue-700"></i>
                        <span className="text-gray-600">Precipitation:</span>
                        <span className="font-semibold text-gray-900">{weatherData.daily?.precipitation_sum?.[index] ?? 'N/A'} mm</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Additional Info Section */}
            <section className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6 text-white">
                <h2 className="text-2xl font-bold">Additional Information</h2>
                <p className="text-amber-100">Helpful insights for farmers</p>
              </div>
              
              <div className="p-8 space-y-8">
                {/* Daylight Info */}
                <div className="bg-orange-50 rounded-lg p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <i className="fas fa-clock text-2xl text-orange-500 mb-2"></i>
                      <h3 className="text-xl font-semibold text-gray-900">Daylight Duration</h3>
                    </div>
                    <p className="text-2xl font-bold text-orange-600">
                      {weatherData.daily?.sunrise && weatherData.daily?.sunset
                        ? (() => {
                            const sunrise = new Date(weatherData.daily.sunrise[0]);
                            const sunset = new Date(weatherData.daily.sunset[0]);
                            const diffMs = sunset - sunrise;
                            const diffHrs = Math.floor(diffMs / 3600000);
                            const diffMins = Math.floor((diffMs % 3600000) / 60000);
                            return `${diffHrs}h ${diffMins}m`;
                          })()
                        : "N/A"}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <i className="fas fa-sun text-yellow-500 text-xl mb-2"></i>
                      <p className="text-sm text-gray-600">Sunrise</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(weatherData.daily?.sunrise?.[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-4 shadow-sm">
                      <i className="fas fa-moon text-blue-900 text-xl mb-2"></i>
                      <p className="text-sm text-gray-600">Sunset</p>
                      <p className="font-semibold text-gray-900">
                        {new Date(weatherData.daily?.sunset?.[0]).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Irrigation Status */}
                <div className="bg-amber-50 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <i className="fas fa-water text-2xl text-amber-600"></i>
                    <div>
                      <h3 className="text-xl font-semibold text-gray-900">Irrigation Status</h3>
                      <p className="text-amber-600 font-medium">
                        {(() => {
                          const soilMoisture = weatherData.hourly?.soil_moisture_0_1cm?.[0];
                          const precipitation = weatherData.hourly?.precipitation?.[0];
                          if (soilMoisture === undefined || precipitation === undefined) return "N/A";
                          if (soilMoisture < 0.2 && precipitation < 1) return "Irrigation needed";
                          if (soilMoisture >= 0.2) return "Soil moisture adequate";
                          return "Monitor conditions";
                        })()}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm text-gray-600">Soil Moisture</span>
                        <span className="text-sm font-medium text-gray-900">
                          {(weatherData.hourly?.soil_moisture_0_1cm?.[0] * 100).toFixed(1)}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2.5">
                        <div 
                          className="bg-amber-600 h-2.5 rounded-full transition-all duration-500"
                          style={{ width: `${((weatherData.hourly?.soil_moisture_0_1cm?.[0] || 0) * 100)}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Farmer Tips */}
                <div className="bg-amber-50 rounded-lg p-6">
                  <div className="flex items-center space-x-4 mb-6">
                    <i className="fas fa-leaf text-2xl text-amber-600"></i>
                    <h3 className="text-xl font-semibold text-gray-900">Tips for Farmers</h3>
                  </div>
                  <ul className="space-y-4">
                    {(() => {
                      const tips = [];
                      const uvIndex = weatherData.hourly?.uv_index?.[0];
                      const windSpeed = weatherData.hourly?.windspeed_10m?.[0];
                      const precipitation = weatherData.hourly?.precipitation?.[0];

                      if (uvIndex !== undefined) {
                        if (uvIndex >= 8) {
                          tips.push({
                            icon: "fa-sun",
                            color: "text-red-500",
                            text: "Very high UV levels. Avoid sun exposure and wear protective clothing and sunscreen."
                          });
                        } else if (uvIndex >= 6) {
                          tips.push({
                            icon: "fa-sun",
                            color: "text-orange-500",
                            text: "High UV levels. Minimize sun exposure and wear protective clothing and sunscreen."
                          });
                        } else if (uvIndex >= 3) {
                          tips.push({
                            icon: "fa-sun",
                            color: "text-amber-500",
                            text: "Moderate UV levels. Wear sunscreen and protective clothing when outdoors."
                          });
                        }
                      }
                      if (windSpeed !== undefined && windSpeed > 20) {
                        tips.push({
                          icon: "fa-wind",
                          color: "text-blue-500",
                          text: "Strong winds expected, secure loose items and protect young plants."
                        });
                      }
                      if (precipitation !== undefined && precipitation > 5) {
                        tips.push({
                          icon: "fa-cloud-showers-heavy",
                          color: "text-blue-700",
                          text: "Heavy rain expected, check drainage and protect crops from waterlogging."
                        });
                      }
                      if (tips.length === 0) {
                        tips.push({
                          icon: "fa-check-circle",
                          color: "text-green-500",
                          text: "Weather conditions are favorable for farming today."
                        });
                      }
                      return tips.map((tip, idx) => (
                        <li key={idx} className="flex items-center space-x-3 bg-white p-4 rounded-lg shadow-sm">
                          <i className={`fas ${tip.icon} ${tip.color} text-xl`}></i>
                          <span className="text-gray-700">{tip.text}</span>
                        </li>
                      ));
                    })()}
                  </ul>
                </div>
              </div>
            </section>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[400px] bg-white rounded-xl shadow-lg p-8">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent mb-4"></div>
            <p className="text-amber-600 text-lg">Loading weather data...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default WeatherForecast;
