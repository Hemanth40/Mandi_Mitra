import React, { useEffect, useState } from 'react';

const WeatherForecast = () => {
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          fetchWeather(latitude, longitude);
        },
        (err) => {
          setError('Unable to retrieve your location');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const response = await fetch(`/api/weather/current?lat=${lat}&lon=${lon}`);
      if (!response.ok) {
        throw new Error('Failed to fetch weather data');
      }
      const data = await response.json();
      setWeather({
        city: data.name,
        description: data.weather[0].description,
        temperature: data.main.temp,
      });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white p-8">
      <h1 className="text-3xl font-bold text-green-800 mb-6">Weather Forecast</h1>
      <div className="bg-white p-6 rounded-xl shadow-md">
        {error && <p className="text-red-600">{error}</p>}
        {weather ? (
          <div className="p-4 border border-green-200 rounded-lg">
            <h3 className="font-bold text-green-700">{weather.city}</h3>
            <p className="text-sm text-gray-600 capitalize">
              {weather.description}, {weather.temperature}°C
            </p>
          </div>
        ) : (
          !error && <p>Loading weather data...</p>
        )}
      </div>
    </div>
  );
};

export default WeatherForecast;
