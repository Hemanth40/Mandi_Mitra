const express = require('express');
const router = express.Router();
const axios = require('axios');

// Load environment variables
require('dotenv').config();

// API Configuration from environment variables
const API_CONFIG = {
  cropHealth: {
    url: process.env.CROP_HEALTH_URL,
    key: process.env.CROP_HEALTH_API_KEY,
    enabled: !!process.env.CROP_HEALTH_API_KEY
  },
  plantId: {
    url: process.env.PLANT_ID_URL,
    key: process.env.PLANT_ID_API_KEY,
    enabled: !!process.env.PLANT_ID_API_KEY
  },
  insectId: {
    url: process.env.INSECT_ID_URL,
    key: process.env.INSECT_ID_API_KEY,
    enabled: !!process.env.INSECT_ID_API_KEY
  },
  mushroomId: {
    url: process.env.MUSHROOM_ID_URL,
    key: process.env.MUSHROOM_ID_API_KEY,
    enabled: !!process.env.MUSHROOM_ID_API_KEY
  }
};

// Helper function to make API requests
async function makeAPIRequest(service, endpoint, data) {
  try {
    const config = API_CONFIG[service];
    if (!config) {
      throw new Error(`Service ${service} not configured`);
    }

    console.log(`Making request to ${service} API at ${config.url}${endpoint}...`);
    const response = await axios.post(`${config.url}${endpoint}`, data, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': config.key
      },
      timeout: 30000
    });

    console.log(`${service} API response received:`, response.status);
    return response.data;
  } catch (error) {
    console.error(`Error calling ${service}:`, error.message);
    if (error.response) {
      console.error(`Status: ${error.response.status}`);
      console.error(`Data:`, error.response.data);
    }
    throw error; // Re-throw to handle in route
  }
}

// Health analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    console.log('=== Crop Doctor Analysis Request ===');

    if (!req.files || !req.files.image) {
      console.error('No image file provided in request');
      return res.status(400).json({
        error: 'No image file provided',
        details: 'Please upload an image file with the key "image"'
      });
    }

    const imageFile = req.files.image;

    // Proper handling for express-fileupload
    console.log('File received:', {
      name: imageFile.name,
      mimetype: imageFile.mimetype,
      size: imageFile.size,
      encoding: imageFile.encoding,
      tempFilePath: imageFile.tempFilePath
    });

    // Get the actual file data - express-fileupload puts it in .data
    if (!imageFile.data || !Buffer.isBuffer(imageFile.data)) {
      console.error('Invalid file data format:', {
        hasData: !!imageFile.data,
        isBuffer: imageFile.data ? Buffer.isBuffer(imageFile.data) : false
      });
      return res.status(400).json({
        error: 'Invalid image file - no data received',
        details: 'File upload format issue',
        fileInfo: {
          name: imageFile.name,
          mimetype: imageFile.mimetype,
          size: imageFile.size
        }
      });
    }

    const fileSize = imageFile.data.length;
    const mimeType = imageFile.mimetype || 'unknown';

    // Validate file size
    if (fileSize === 0) {
      return res.status(400).json({
        error: 'Invalid image file - empty file',
        details: 'The uploaded file is empty'
      });
    }

    if (fileSize > 5 * 1024 * 1024) { // 5MB limit
      return res.status(400).json({
        error: 'Image file too large',
        details: `File size ${Math.round(fileSize / 1024 / 1024 * 100) / 100}MB exceeds 5MB limit`
      });
    }

    // Validate image type
    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/jpg'];
    if (!allowedTypes.includes(mimeType) && mimeType !== 'unknown') {
      return res.status(400).json({
        error: 'Invalid image type',
        details: `Please upload JPG, PNG, or WebP images. Received: ${mimeType}`
      });
    }

    // Convert to base64
    const base64Image = imageFile.data.toString('base64');
    const type = req.body?.type || 'plant';

    console.log(`Processing ${type} image: ${fileSize} bytes, type: ${mimeType}`);

    let result = null;
    let service = '';
    let endpoint = '';

    switch (type) {
      case 'crop':
        service = 'cropHealth';
        endpoint = '/health_assessment';
        break;

      case 'insect':
        service = 'insectId';
        endpoint = '/identification';
        break;

      case 'mushroom':
        service = 'mushroomId';
        endpoint = '/identification';
        break;

      default: // plant
        service = 'plantId';
        endpoint = '/health_assessment';
    }

    if (!API_CONFIG[service] || !API_CONFIG[service].enabled) {
      return res.status(503).json({
        error: `${service} API not configured`,
        details: `Please check your ${service} API key in environment variables`
      });
    }

    const requestData = {
      images: [base64Image],
      similar_images: true,
      health: "only"
    };

    console.log(`Calling ${service} API at ${API_CONFIG[service].url}${endpoint}`);
    result = await makeAPIRequest(service, endpoint, requestData);

    if (!result) {
      return res.status(500).json({
        error: 'Unable to process image with external services',
        details: 'Service temporarily unavailable',
        service: service
      });
    }

    const formattedResult = formatAnalysisResult(result, type);
    res.json(formattedResult);

  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({
      error: 'Failed to process image',
      details: error.message,
      service_error: error.response?.data || error.message,
      status: error.response?.status
    });
  }
});

// Plant identification endpoint
router.post('/identify', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;
    const base64Image = imageFile.data.toString('base64');

    const result = await makeAPIRequest('plantId', '/identification', {
      images: [base64Image],
      similar_images: true,
      language: "en"
    });

    if (!result) {
      return res.status(500).json({
        error: 'Unable to identify plant',
        details: 'Service temporarily unavailable'
      });
    }

    res.json({
      plant: result.result?.classification?.suggestions?.[0] || null,
      similarImages: result.result?.similar_images || [],
      confidence: result.result?.classification?.suggestions?.[0]?.probability || 0
    });

  } catch (error) {
    console.error('Error identifying plant:', error);
    res.status(500).json({
      error: 'Failed to identify plant',
      details: error.message,
      service_error: error.response?.data || error.message
    });
  }
});

// Enhanced health check endpoint
router.get('/health', (req, res) => {
  const services = Object.keys(API_CONFIG);
  const serviceStatus = services.map(service => ({
    name: service,
    enabled: API_CONFIG[service].enabled,
    url: API_CONFIG[service].url,
    status: API_CONFIG[service].enabled ? 'configured' : 'missing_key'
  }));

  res.json({
    status: 'healthy',
    services: serviceStatus,
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development',
    api_keys_configured: services.filter(s => API_CONFIG[s].enabled).length,
    total_services: services.length
  });
});

// Helper function to format analysis results
function formatAnalysisResult(data, type) {
  console.log('=== Formatting Analysis Result ===');
  console.log('Full API Response:', JSON.stringify(data, null, 2));

  // For plant/crop health analysis
  const isHealthy = data.result?.is_healthy?.binary || false;
  const diseaseSuggestions = data.result?.disease?.suggestions || [];
  const classification = data.result?.classification;

  console.log('Is Healthy:', isHealthy);
  console.log('Disease Suggestions:', diseaseSuggestions);
  console.log('Classification:', classification);

  // Convert disease suggestions to our format
  const diseases = diseaseSuggestions.map(disease => ({
    name: disease.name || 'Unknown Disease',
    probability: Math.round((disease.probability || 0) * 100),
    description: `Detected ${disease.name} with ${Math.round((disease.probability || 0) * 100)}% confidence`,
    treatment: `Treatment for ${disease.name} should be based on specific symptoms and plant type`,
    source: 'Plant ID AI Analysis',
    similarImages: disease.similar_images || []
  }));

  return {
    type: type,
    isHealthy: isHealthy,
    confidence: data.result?.is_healthy?.probability || 0,
    diseases: diseases,
    plant: classification?.suggestions?.[0] || null
  };
}

// Helper function to format treatment information
function formatTreatment(treatment) {
  if (!treatment) return 'No treatment information available';

  if (typeof treatment === 'string') return treatment;

  if (Array.isArray(treatment)) {
    return treatment.map(t => `• ${t}`).join('\n');
  }

  if (typeof treatment === 'object') {
    const sections = [];
    if (treatment.prevention) sections.push(`Prevention:\n${treatment.prevention.map(p => `• ${p}`).join('\n')}`);
    if (treatment.biological) sections.push(`Biological:\n${treatment.biological.map(b => `• ${b}`).join('\n')}`);
    if (treatment.chemical) sections.push(`Chemical:\n${treatment.chemical.map(c => `• ${c}`).join('\n')}`);
    return sections.join('\n\n');
  }

  return 'Treatment information available';
}

module.exports = router;
