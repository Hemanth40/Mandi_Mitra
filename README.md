# 🌾 Mandi Mitra – Agricultural Assistant Platform

> An AI-powered full-stack platform that helps Indian farmers make better farming decisions using real-time weather data, mandi prices, crop disease detection, and agricultural insights.

---

## 🚀 Overview
Mandi Mitra is a comprehensive agricultural assistance platform designed to support farmers with accurate, location-based information and AI-driven tools.  
It integrates real-time APIs and AI services to improve crop health, market awareness, and overall farming productivity.

---

## Project Structure
```
Mandi_Mitra/
├── backend/                 # Express.js backend API
│   ├── routes/             # API route handlers
│   ├── middleware/         # Authentication & validation
│   └── models/            # Database models
├── frontend/              # React.js frontend application
├── mcp-servers/           # MCP server implementations
│   └── mandi-mitra/      # MCP server for AI tools
└── docs/                 # Documentation files
```

## Core Features

### 1. Weather Services
- **Real-time Weather Data**: Current conditions, hourly forecasts, and 7-day predictions
- **Location-based**: Uses GPS coordinates for precise weather information
- **Agricultural Focus**: Includes soil temperature, humidity, and precipitation forecasts
- **API**: Open-Meteo API (Free tier available)

### 2. Market Price Information
- **Live Market Prices**: Real-time commodity prices from major mandis
- **Price Trends**: Historical price data and trend analysis
- **Location-based**: Prices specific to user's region
- **Multiple Commodities**: Grains, vegetables, fruits, and pulses

### 3. Crop Disease Detection
- **AI-Powered Analysis**: Uses advanced computer vision for disease identification
- **Multiple Detection Types**:
  - Plant disease identification
  - Insect pest detection
  - Mushroom identification
  - Crop health assessment
- **Image-based**: Upload photos for instant analysis
- **APIs Used**: Plant.ID, custom AI models

### 4. Agricultural News
- **Curated News**: Agriculture, farming, and farmer welfare news
- **Multiple Sources**: Aggregated from reliable agricultural publications
- **Regional Focus**: India-specific agricultural news
- **API**: NewsAPI with agriculture keywords

### 5. AI Chat Assistant
- **Farmer-focused**: Trained on agricultural data and best practices
- **Multi-language**: Supports Hindi and regional languages
- **Real-time**: Instant responses to farming queries
- **Integration**: Connected to weather, market, and disease data

## Technology Stack

### Backend
- **Runtime**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens
- **File Upload**: Multer for image processing
- **AI Services**: Multiple APIs for crop analysis
- **Weather**: Open-Meteo API
- **News**: NewsAPI

### Frontend
- **Framework**: React.js with Vite
- **Styling**: Tailwind CSS
- **State Management**: React Context API
- **Maps**: Leaflet for location services
- **Charts**: Chart.js for data visualization

### MCP Server
- **Protocol**: Model Context Protocol (MCP)
- **Language**: TypeScript
- **Purpose**: AI tool integration for external applications

## Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or cloud)
- API Keys (see configuration section)

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file
cp .env.example .env

# Configure environment variables (see Configuration section)
# Start the server
npm run dev
```

### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### MCP Server Setup
```bash
# Navigate to MCP server directory
cd mcp-servers/mandi-mitra

# Install dependencies
npm install

# Build the server
npm run build

# Configure in MCP settings (see MCP Configuration)
```

## Configuration

### Required Environment Variables

#### Backend (.env)
```bash
# Database
MONGODB_URI=mongodb://localhost:27017/mandi_mitra

# JWT
JWT_SECRET=your_jwt_secret_key

# External APIs
OPEN_METEO_API_KEY=your_open_meteo_key
NEWS_API_KEY=your_news_api_key
PLANT_ID_API_KEY=your_plant_id_key
CROP_HEALTH_API_KEY=your_crop_health_key
INSECT_ID_API_KEY=your_insect_id_key
MUSHROOM_ID_API_KEY=your_mushroom_id_key

# Server
PORT=5000
NODE_ENV=development
```

#### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000/api
```

#### MCP Server Configuration
Add to your MCP settings file:
```json
{
  "mcpServers": {
    "mandi-mitra": {
      "command": "node",
      "args": ["/path/to/mandi-mitra/build/index.js"],
      "env": {
        "OPEN_METEO_API_KEY": "your_open_meteo_key",
        "NEWS_API_KEY": "your_news_api_key",
        "PLANT_ID_API_KEY": "your_plant_id_key",
        "CROP_HEALTH_API_KEY": "your_crop_health_key",
        "INSECT_ID_API_KEY": "your_insect_id_key",
        "MUSHROOM_ID_API_KEY": "your_mushroom_id_key"
      }
    }
  }
}
```

## API Endpoints

### Weather Endpoints
- `GET /api/weather/current` - Current weather
- `GET /api/weather/forecast` - Weather forecast
- `GET /api/weather/history` - Historical weather data

### Market Endpoints
- `GET /api/market/prices` - Current market prices
- `GET /api/market/trends` - Price trends
- `GET /api/market/commodities` - Available commodities

### Crop Doctor Endpoints
- `POST /api/crop/analyze` - Analyze crop health
- `POST /api/crop/identify-plant` - Identify plant species
- `POST /api/crop/identify-insect` - Identify insects
- `POST /api/crop/identify-mushroom` - Identify mushrooms

### News Endpoints
- `GET /api/news/latest` - Latest agriculture news
- `GET /api/news/category/:category` - News by category

### User Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `GET /api/user/profile` - User profile
- `PUT /api/user/profile` - Update profile

## MCP Server Tools

The MCP server provides the following tools for AI applications:

### Weather Tools
- `get_weather_forecast` - Get weather data for coordinates
- `get_weather_history` - Get historical weather data

### News Tools
- `get_agriculture_news` - Get latest agriculture news

### Crop Analysis Tools
- `analyze_crop_health` - Analyze crop health from image
- `identify_plant` - Identify plant species
- `identify_insect` - Identify insects
- `identify_mushroom` - Identify mushrooms

## Usage Examples

### Weather Query
```javascript
// Get weather for Delhi
const weather = await fetch('/api/weather/current?lat=28.7041&lon=77.1025')
```

### Crop Analysis
```javascript
// Upload image for disease detection
const formData = new FormData();
formData.append('image', file);
formData.append('cropType', 'wheat');

const result = await fetch('/api/crop/analyze', {
  method: 'POST',
  body: formData
});
```

### Market Prices
```javascript
// Get prices for user's location
const prices = await fetch('/api/market/prices?location=delhi&commodity=wheat');
```

## Development

### Running in Development Mode
```bash
# Terminal 1: Backend
cd backend && npm run dev

# Terminal 2: Frontend
cd frontend && npm run dev

# Terminal 3: MCP Server (optional)
cd mcp-servers/mandi-mitra && npm run dev
```

### Building for Production
```bash
# Backend
cd backend && npm run build

# Frontend
cd frontend && npm run build

# MCP Server
cd mcp-servers/mandi-mitra && npm run build
```

## API Keys Setup

### Getting API Keys

1. **Open-Meteo API**: Free at https://open-meteo.com/
2. **NewsAPI**: Get key at https://newsapi.org/
3. **Plant.ID**: Register at https://web.plant.id/
4. **Crop Health API**: Contact provider for access
5. **Insect ID API**: Contact provider for access
6. **Mushroom ID API**: Contact provider for access

## Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure frontend URL is in backend CORS whitelist
2. **Image Upload Issues**: Check file size limits and supported formats
3. **API Rate Limits**: Monitor usage and implement caching
4. **Database Connection**: Verify MongoDB connection string

### Debug Mode
```bash
# Enable debug logging
DEBUG=mandi-mitra:* npm run dev
```

## Contributing
1. Fork the repository
2. Create feature branch
3. Commit changes
4. Push to branch
5. Create Pull Request

## Roadmap
- [ ] Weather-based crop recommendations
- [ ] Offline mode for rural areas
- [ ] Voice assistant integration
- [ ] Regional language support expansion
- [ ] IoT sensor integration
- [ ] Marketplace integration
