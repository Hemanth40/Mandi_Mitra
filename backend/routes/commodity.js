require('dotenv').config();
const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();

const EXTERNAL_API_URL = process.env.COMMODITY_API_URL || 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
const API_KEY = process.env.COMMODITY_API_KEY || '579b464db66ec23bdd000001c930d933dc864d2c60dcf9070a7006d3';

console.log('Using EXTERNAL_API_URL:', EXTERNAL_API_URL);
console.log('Using API_KEY:', API_KEY);

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
        limit: 5000,
        format: 'json',
      },
      httpsAgent,
      timeout: 60000,
    });

    // The API returns data in response.data.records
    const records = response.data.records || [];

    // Filter records by state (case-insensitive)
    const filteredRecords = records.filter(item => 
      item.state && item.state.toLowerCase() === state.toLowerCase()
    );

    // Return actual API data (empty array if no data for state)
    res.json(filteredRecords);
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
