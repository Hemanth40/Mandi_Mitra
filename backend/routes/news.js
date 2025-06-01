const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

const NEWS_API_KEY = '0e1b5a16c967431b9a3eaa6e211e33b3';

router.get('/', async (req, res) => {
  try {
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