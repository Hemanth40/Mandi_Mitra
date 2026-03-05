const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');
const NodeCache = require('node-cache');

require('dotenv').config();

const NEWS_API_KEY = process.env.NEWS_API_KEY;

// News cache TTL: 1 hour (3600 seconds)
const newsCache = new NodeCache({ stdTTL: 3600 });


router.get('/', async (req, res) => {
  // Check Cache
  const cacheKey = 'agriculture_news';
  const cachedData = newsCache.get(cacheKey);
  if (cachedData) {
    console.log('[Cache Hit] News data');
    return res.json(cachedData);
  }

  console.log('[Cache Miss] Fetching news data');

  try {
    if (!NEWS_API_KEY) {
      return res.status(503).json({ error: 'News API key not configured' });
    }
    // Refined query for agriculture and farmer related news only
    const url = `https://newsapi.org/v2/everything?q=agriculture OR farming OR farmers OR agri-tech&language=en&sortBy=publishedAt&apiKey=${NEWS_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      newsCache.set(cacheKey, data);
    }

    res.json(data);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch news' });
  }
});

module.exports = router;