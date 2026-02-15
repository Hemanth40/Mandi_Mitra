require('dotenv').config();
const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();

const EXTERNAL_API_URL = process.env.COMMODITY_API_URL;
const API_KEY = process.env.COMMODITY_API_KEY;

router.get('/prices', async (req, res) => {
  const state = req.query.state;
  if (!state) {
    return res.status(400).json({ error: 'State parameter is required' });
  }

  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });

    // Call the external API with required parameters
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 1000, // Reduced limit since we are filtering by state
        format: 'json',
        'filters[state]': state, // Filter by state at the API level
      },
      httpsAgent,
      timeout: 60000,
    });

    // The API returns data in response.data.records
    const records = response.data.records || [];

    // Return actual API data
    res.json(records);
  } catch (error) {
    console.error('Error fetching commodity prices:', error.message);

    // Return actual error to frontend for proper handling
    res.status(500).json({
      error: 'Failed to fetch commodity prices from external API',
      details: error.message,
      status: error.response?.status || 'Network Error',
      timestamp: new Date().toISOString()
    });
  }
});

router.get('/available-states', async (req, res) => {
  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 100,
        format: 'json',
      },
      httpsAgent,
      timeout: 30000,
    });

    const records = response.data.records || [];
    const uniqueStates = [...new Set(records.map(item => item.state).filter(Boolean))].sort();

    res.json({
      valid: true,
      availableStates: uniqueStates,
      totalRecords: response.data.total || 0,
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
