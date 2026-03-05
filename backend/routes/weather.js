const express = require('express');
const axios = require('axios');
const NodeCache = require('node-cache');
const router = express.Router();

// Weather cache TTL: 30 minutes (1800 seconds)
const weatherCache = new NodeCache({ stdTTL: 1800 });

// Validation middleware
const validateCoordinates = (req, res, next) => {
  const lat = parseFloat(req.query.lat);
  const lon = parseFloat(req.query.lon);

  if (isNaN(lat) || lat < -90 || lat > 90) {
    return res.status(400).json({ error: 'Invalid latitude. Must be between -90 and 90' });
  }
  if (isNaN(lon) || lon < -180 || lon > 180) {
    return res.status(400).json({ error: 'Invalid longitude. Must be between -180 and 180' });
  }

  next();
};

router.get('/current', validateCoordinates, async (req, res) => {
  const { lat, lon } = req.query;

  // Round to 2 decimal places (approx. 1.1km accuracy)
  // This increases cache hit rate for nearby locations
  const rLat = parseFloat(lat).toFixed(2);
  const rLon = parseFloat(lon).toFixed(2);
  const cacheKey = `weather_${rLat}_${rLon}`;

  const cachedData = weatherCache.get(cacheKey);
  if (cachedData) {
    console.log(`[Cache Hit] Weather data for ${rLat}, ${rLon}`);
    return res.json(cachedData);
  }

  console.log(`[Cache Miss] Fetching weather data for coordinates: ${rLat}, ${rLon} (Original: ${lat}, ${lon})`);

  // API URL construction with all required parameters
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${rLat}&longitude=${rLon}&hourly=temperature_2m,precipitation,relativehumidity_2m,windspeed_10m,winddirection_10m,uv_index,windgusts_10m,soil_moisture_0_1cm&daily=temperature_2m_max,temperature_2m_min,precipitation_sum,sunrise,sunset,uv_index_max&current_weather=true&timezone=auto`;
  console.log('Requesting weather from:', url);

  try {
    console.log('Fetching weather data...');
    const response = await axios.get(url);
    console.log('Weather API response status:', response.status);

    const data = response.data;
    console.log('Weather data received:', {
      current_weather: data.current_weather,
      has_hourly: !!data.hourly,
      has_daily: !!data.daily
    });

    // Save to Cache
    weatherCache.set(cacheKey, data);

    res.json(data);
  } catch (error) {
    console.error('Weather API Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
