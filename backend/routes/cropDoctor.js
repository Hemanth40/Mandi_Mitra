const express = require('express');
const router = express.Router();
const axios = require('axios');

// API Keys
const PLANT_ID_API_KEY = process.env.PLANT_ID_API_KEY;

if (!PLANT_ID_API_KEY) {
  console.error('Warning: PLANT_ID_API_KEY is not set in environment variables');
}

// Helper function to make API requests
async function makeAPIRequest(url, data, apiKey) {
  try {
    const response = await axios.post(url, data, {
      headers: {
        'Content-Type': 'application/json',
        'Api-Key': apiKey
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error calling ${url}:`, error.message);
    return null;
  }
}

// Main analysis endpoint
router.post('/analyze', async (req, res) => {
  try {
    if (!req.files || !req.files.image) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const imageFile = req.files.image;
    const base64Image = imageFile.data.toString('base64');

    // Make parallel API requests
    console.log('Processing image analysis request...');
    
    console.log('Making request to Plant.id API...');
    
    const plantIdResult = await makeAPIRequest('https://api.plant.id/v2/health_assessment', {
      images: [base64Image],
      modifiers: ["crops_fast", "similar_images"],
      disease_details: ["description", "treatment"],
      language: "en"
    }, PLANT_ID_API_KEY).catch(error => {
      console.error('Plant.id API error:', error.message);
      return null;
    });

    console.log('Plant.id API response:', plantIdResult);

    // Check if API call failed
    const apiFailed = !plantIdResult;
    
    const results = {
      isHealthy: !apiFailed && (!plantIdResult.health_assessment?.diseases || plantIdResult.health_assessment.diseases.length === 0),
      diseases: []
    };

    if (apiFailed) {
      results.diseases.push({
        name: "API Connection Error",
        probability: 100,
        description: "Unable to connect to the plant disease detection service. This might be due to API rate limits or connection issues.",
        treatment: "Please try again later or contact support if the issue persists.",
        source: "System"
      });
    } else if (plantIdResult.health_assessment?.diseases) {
      console.log('Processing plant diseases with full details:', 
        JSON.stringify(plantIdResult.health_assessment.diseases, null, 2)
      );
      
      results.diseases = plantIdResult.health_assessment.diseases
        .filter(disease => !disease.redundant) // Filter out redundant diseases
        .map(disease => {
          console.log(`Processing disease ${disease.name} details:`, 
            JSON.stringify(disease.disease_details, null, 2)
          );
          
          console.log(`Full disease details for ${disease.name}:`, JSON.stringify(disease, null, 2));
          console.log(`Disease details object for ${disease.name}:`, JSON.stringify(disease.disease_details, null, 2));
          
          let treatmentText = 'No treatment information available';
          const treatment = disease.disease_details?.treatment;
          
          if (treatment) {
            console.log(`Treatment data for ${disease.name}:`, JSON.stringify(treatment, null, 2));
            
            if (typeof treatment === 'object' && !Array.isArray(treatment)) {
              const sections = [];
              if (treatment.prevention && Array.isArray(treatment.prevention)) {
                sections.push(`Prevention:\n• ${treatment.prevention.join('\n• ')}`);
              }
              if (treatment.biological && Array.isArray(treatment.biological)) {
                sections.push(`Biological Control:\n• ${treatment.biological.join('\n• ')}`);
              }
              if (treatment.chemical && Array.isArray(treatment.chemical)) {
                sections.push(`Chemical Control:\n• ${treatment.chemical.join('\n• ')}`);
              }
              treatmentText = sections.join('\n\n') || treatmentText;
            } else if (Array.isArray(treatment)) {
              treatmentText = `• ${treatment.join('\n• ')}`;
            } else if (typeof treatment === 'string') {
              treatmentText = treatment;
            }
          }

          const diseaseData = {
            name: disease.name || 'Unknown Disease',
            probability: Math.round((disease.probability || 0) * 100),
            description: disease.disease_details?.description || 'No description available',
            treatment: treatmentText,
            source: 'Plant.id'
          };

          console.log(`Processed disease data for ${disease.name}:`, JSON.stringify(diseaseData, null, 2));
          return diseaseData;
        });

      // Sort by probability
      results.diseases.sort((a, b) => b.probability - a.probability);
    }

    console.log('Sending response:', results);

    res.json(results);
  } catch (error) {
    console.error('Error processing image:', error);
    res.status(500).json({
      error: 'Failed to process image',
      details: error.message
    });
  }
});

module.exports = router;
