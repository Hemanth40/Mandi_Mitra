const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

router.get('/', async (req, res) => {
  try {
    if (!NEWS_API_KEY) {
      return res.status(503).json({ error: 'News API key not configured' });
    }
    // Refined query for agriculture and farmer related news only
    const url = `https://newsapi.org/v2/everything?q=agriculture OR farming OR farmers OR agri-tech&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;