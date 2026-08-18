require('dotenv').config();
const express = require('express');
const axios = require('axios');
const https = require('https');
const NodeCache = require('node-cache');
const router = express.Router();

// Cache instances
// Prices cache TTL: 1 hour (3600 seconds)
const pricesCache = new NodeCache({ stdTTL: 3600 });
// States cache TTL: 24 hours (86400 seconds)
const statesCache = new NodeCache({ stdTTL: 86400 });

const EXTERNAL_API_URL = process.env.COMMODITY_API_URL;
const API_KEY = process.env.COMMODITY_API_KEY;

// State alias dictionary for government naming differences
const STATE_ALIASES = {
  'Kerala': 'Keralam',
  'Andaman and Nicobar Islands': 'Andaman and Nicobar',
  'Orissa': 'Odisha',
  'Pondicherry': 'Puducherry'
};

router.get('/prices', async (req, res) => {
  let state = req.query.state;
  if (!state) {
    return res.status(400).json({ error: 'State parameter is required' });
  }

  // Normalize state name if alias exists
  if (STATE_ALIASES[state]) {
    state = STATE_ALIASES[state];
  }

  // Check Cache
  const cacheKey = `prices_${state}`;
  const cachedData = pricesCache.get(cacheKey);
  if (cachedData) {
    console.log(`[Cache Hit] Commodity prices for state: ${state}`);
    return res.json(cachedData);
  }

  console.log(`[Cache Miss] Fetching commodity prices for state: ${state}`);

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    // Call the external API with required parameters
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 1000,
        format: 'json',
        'filters[state]': state,
      },
      httpsAgent,
      timeout: 60000,
    });

    const records = response.data.records || [];

    // Save to Cache
    pricesCache.set(cacheKey, records);

    // Return actual API data
    res.json(records);
  } catch (error) {
    console.error('Error fetching commodity prices:', error.message);

    res.status(500).json({
      error: 'Failed to fetch commodity prices from external API',
      details: error.message,
      status: error.response?.status || 'Network Error',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/available-states', async (req, res) => {
  const cacheKey = 'available_states_list';
  const cachedData = statesCache.get(cacheKey);
  if (cachedData) {
    return res.json(cachedData);
  }

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const knownActiveStates = [
      'Andaman and Nicobar', 'Andhra Pradesh', 'Bihar', 'Gujarat',
      'Haryana', 'Himachal Pradesh', 'Kerala', 'Madhya Pradesh',
      'Maharashtra', 'Odisha', 'Punjab', 'Rajasthan',
      'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
      'Uttarakhand', 'West Bengal'
    ];

    const result = {
      valid: true,
      activeStates: knownActiveStates,
      lastUpdated: new Date().toISOString()
    };

    statesCache.set(cacheKey, result);
    res.json(result);
  } catch (error) {
    console.error('Available states error:', error.message);
    res.status(500).json({ valid: false, error: error.message });
  }
});


router.get('/check-api-key', async (req, res) => {
  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 10,
        format: 'json',
      },
      httpsAgent,
      timeout: 30000,
    });

    const records = response.data.records || [];
    const uniqueStates = [...new Set(records.map(item => item.state).filter(Boolean))].sort();

    res.json({
      valid: true,
      message: 'API key is working',
      totalRecords: response.data.total || 0,
      availableStates: uniqueStates,
      sampleRecords: records.slice(0, 3),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('API key validation error:', error.message);
    res.status(500).json({
      valid: false,
      error: error.message,
      status: error.response?.status || 'Network Error'
    });
  }
});

module.exports = router;
