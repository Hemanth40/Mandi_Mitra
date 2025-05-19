require('dotenv').config();
const express = require('express');
const axios = require('axios');
const https = require('https');
const router = express.Router();

const EXTERNAL_API_URL = 'https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070';
const API_KEY = '579b464db66ec23bdd000001cdc3b564546246a772a26393094f5645';

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
        limit: 'all',
        format: 'json',
      },
      httpsAgent,
    });

    // The API returns data in response.data.records
    const records = response.data.records || [];

    // Filter records by state (case-insensitive)
    const filteredRecords = records.filter(item => item.state && item.state.toLowerCase() === state.toLowerCase());

    res.json(filteredRecords);
  } catch (error) {
    console.error('Error fetching commodity prices:', error.message);
    console.error('Full error object:', error);
    if (error.response) {
      console.error('Response data:', error.response.data);
      console.error('Response status:', error.response.status);
      console.error('Response headers:', error.response.headers);
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    res.status(500).json({ error: 'Failed to fetch commodity prices' });
  }
});

router.get('/check-api-key', async (req, res) => {
  try {
    const httpsAgent = new https.Agent({ rejectUnauthorized: false });
    const response = await axios.get(EXTERNAL_API_URL, {
      params: {
        'api-key': API_KEY,
        offset: 0,
        limit: 'all',
        format: 'json',
      },
      httpsAgent,
    });
    res.json({ valid: true });
  } catch (error) {
    console.error('API key validation error:', error.message);
    res.status(401).json({ valid: false, error: error.message });
  }
});

module.exports = router;