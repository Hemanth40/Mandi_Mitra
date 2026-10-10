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

const EXTERNAL_API_URL = (process.env.COMMODITY_API_URL || 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070').trim();
const API_KEY = (process.env.COMMODITY_API_KEY || '').trim();

// Realistic browser headers to prevent WAF / Akamai blocking
const REQUEST_HEADERS = {
  'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/128.0.0.0 Safari/537.36 MandiMitra/1.0',
  'Accept': 'application/json, text/plain, */*',
  'Accept-Language': 'en-IN,en-US;q=0.9,en;q=0.8',
  'Cache-Control': 'no-cache'
};

// State alias dictionary for standard naming consistency
const STATE_ALIASES = {
  'Andaman and Nicobar Islands': 'Andaman and Nicobar',
  'Orissa': 'Odisha',
  'Pondicherry': 'Puducherry'
};

/**
 * Fetch commodity data directly using the user's API key with automatic retry
 */
async function fetchFromGovApi(state, offset = 0, limit = 1000) {
  const httpsAgent = new https.Agent({ rejectUnauthorized: false, keepAlive: true });
  const params = {
    'api-key': API_KEY,
    offset,
    limit,
    format: 'json',
    'filters[state]': state,
  };

  const config = {
    params,
    headers: REQUEST_HEADERS,
    httpsAgent,
    timeout: 15000,
  };

  let lastError = null;
  // Try up to 2 attempts
  for (let attempt = 1; attempt <= 2; attempt++) {
    try {
      console.log(`[Commodity API] Attempt ${attempt} querying ${EXTERNAL_API_URL} for state: ${state}`);
      const response = await axios.get(EXTERNAL_API_URL, config);
      return response.data;
    } catch (err) {
      lastError = err;
      console.warn(`[Commodity API] Attempt ${attempt} error: ${err.message}`);
      if (attempt < 2) {
        await new Promise((r) => setTimeout(r, 1000));
      }
    }
  }
  throw lastError;
}

router.get('/prices', async (req, res) => {
  let state = req.query.state;
  if (!state) {
    return res.status(400).json({ error: 'State parameter is required' });
  }

  state = state.trim();
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

  if (!API_KEY) {
    console.error('[Commodity API Error] COMMODITY_API_KEY is not configured in backend environment');
    return res.status(500).json({
      error: 'COMMODITY_API_KEY is missing from server configuration.',
      details: 'Please set COMMODITY_API_KEY in backend/.env with your valid data.gov.in API key.',
      status: 'Config Error',
      timestamp: new Date().toISOString()
    });
  }

  console.log(`[Cache Miss] Fetching commodity prices with API key for state: ${state}`);

  try {
    const data = await fetchFromGovApi(state);
    const records = data.records || [];

    // Cache non-empty valid records
    if (records.length > 0) {
      pricesCache.set(cacheKey, records);
    }

    res.json(records);
  } catch (error) {
    console.error(`[Commodity API Error] Failed for state: ${state}:`, error.message);

    const isNetworkRefused = error.code === 'ECONNREFUSED' || error.message.includes('ECONNREFUSED');
    const isTimeout = error.code === 'ETIMEDOUT' || error.message.includes('timeout');

    let userFriendlyMsg = 'Failed to fetch commodity prices from Government Data Portal (data.gov.in).';
    if (isNetworkRefused) {
      userFriendlyMsg = 'The Government Data Portal (api.data.gov.in) server is currently refusing connections or undergoing maintenance. Please retry in a few moments.';
    } else if (isTimeout) {
      userFriendlyMsg = 'Government Data Portal timed out while responding. Please retry shortly.';
    }

    res.status(502).json({
      error: userFriendlyMsg,
      details: error.message,
      code: error.code || 'API_ERROR',
      status: error.response?.status || 'Network Error',
      state,
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
    const knownActiveStates = [
      'Andaman and Nicobar', 'Andhra Pradesh', 'Arunachal Pradesh', 'Assam',
      'Bihar', 'Chandigarh', 'Chhattisgarh', 'Delhi', 'Goa', 'Gujarat',
      'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir', 'Jharkhand',
      'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
      'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry', 'Punjab',
      'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura',
      'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
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
  if (!API_KEY) {
    return res.status(500).json({
      valid: false,
      error: 'COMMODITY_API_KEY is not defined in backend environment'
    });
  }

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 5,
        format: 'json',
      },
      headers: REQUEST_HEADERS,
      httpsAgent,
      timeout: 15000,
    });

    const records = response.data.records || [];
    const uniqueStates = [...new Set(records.map(item => item.state).filter(Boolean))].sort();

    res.json({
      valid: true,
      message: 'API key is working with data.gov.in',
      totalRecords: response.data.total || records.length,
      availableStates: uniqueStates,
      sampleRecords: records.slice(0, 2),
      lastUpdated: new Date().toISOString()
    });
  } catch (error) {
    console.error('API key validation error:', error.message);
    res.status(502).json({
      valid: false,
      error: error.message,
      code: error.code,
      status: error.response?.status || 'Network Error',
      hint: 'Verify internet connection or check if api.data.gov.in server is accessible.'
    });
  }
});

module.exports = router;
