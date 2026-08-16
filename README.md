# 🌾 Mandi Mitra – AI-Powered Agricultural Intelligence Platform

<div align="center">

![React 19](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6.2-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-4.1-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-22.x-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-5.1-000000?style=for-the-badge&logo=express&logoColor=white)
![Kindwise AI](https://img.shields.io/badge/Kindwise_AI-Vision-22C55E?style=for-the-badge)
![Open-Meteo](https://img.shields.io/badge/Open--Meteo-Weather-0284C7?style=for-the-badge)
![Deployment](https://img.shields.io/badge/Vercel_x_Render-Live-black?style=for-the-badge)

<br/>

**A fast, zero-friction, open-access agricultural platform empowering Indian farmers with real-time mandi prices, hyper-local meteorological forecasts, deep-learning crop disease diagnostics, and welfare schemes.**

[Live Application](#-deployment--hosting) • [Core Features](#-core-features) • [Architecture](#-system-architecture) • [API Documentation](#-api-reference) • [Quickstart](#-quickstart--local-development)

</div>

---

## 🚀 Overview

**Mandi Mitra** is an agricultural intelligence platform built to solve information asymmetry, crop disease losses, and unpredictable weather risks for farmers across India.

By combining real-time open government data (`data.gov.in`), advanced computer vision models (Kindwise & Plant.ID), meteorological APIs (Open-Meteo), and an in-memory caching layer (`node-cache`), Mandi Mitra delivers instant agricultural intelligence in a lightweight, mobile-first interface without requiring logins or account setup.

---

## 🏗️ System Architecture

```mermaid
flowchart TB
    subgraph Client ["Client Layer (React 19 + Vite + Tailwind CSS 4)"]
        UI_Home[Home Landing Page]
        UI_Mandi[Live Mandi Prices]
        UI_Weather[Agro-Weather Forecast]
        UI_Crop[AI Crop Doctor]
        UI_News[Agricultural News]
        UI_Schemes[Government Schemes]
    end

    subgraph Server ["Server Layer (Express 5.1 on Node.js)"]
        Router[Express Routing & CORS Engine]
        RAMCache["In-Memory RAM Cache (node-cache)"]
        UploadHandler[Multipart Stream Buffer Processor]
        FallbackEngine[AI Multi-Service Fallback Engine]
    end

    subgraph ExternalServices ["External Cloud Services & APIs"]
        GovAPI["National Data Portal (data.gov.in Mandi Prices)"]
        MeteoAPI["Open-Meteo Weather Forecast API"]
        NewsAPI["NewsAPI Agriculture Service"]
        KindwiseAPI["Kindwise & Plant.ID Vision Models"]
    end

    Client -->|REST API Requests| Router
    Router --> RAMCache
    RAMCache -.->|Cache Miss <3ms| GovAPI
    RAMCache -.->|Cache Miss <2ms| MeteoAPI
    RAMCache -.->|Cache Miss <2ms| NewsAPI
    Router --> UploadHandler --> FallbackEngine --> KindwiseAPI
```

---

## ✨ Core Features

### 1. 📊 Real-Time Mandi Prices & Market Trends
* **500+ Markets Covered**: Real-time commodity prices across 36 Indian States and Union Territories.
* **Smart Filtering & Sorting**: Filter by state, district, crop type with visual emojis (🍅, 🌾, 🌽, 🥔), and sort by minimum, maximum, or modal price per quintal.
* **Instant In-Memory Caching**: State-level query caching reduces repeat request latency to **<3 ms**.

### 2. 🌤️ Hyper-Local Weather & Agro-Meteorology
* **Precision Geolocation**: GPS-based current temperature, humidity, precipitation, wind speed, and UV index.
* **7-Day Forecast & Soil Data**: Multi-day predictions and soil moisture levels for irrigation planning.
* **Coordinate-Rounding Optimization**: Coordinates rounded to 2 decimal places (~1.1 km radius) to maximize cache hit rates across neighboring farms.

### 3. 🔬 AI Crop Doctor & Disease Diagnostics
* **Multi-Class Computer Vision**: Diagnoses plant diseases, insect pests, and mushroom species from uploaded photos.
* **Actionable Treatment Protocols**: Provides biological, chemical, and preventive treatment guidelines.
* **Dual-Engine Fallback Resilience**: Automated failover across Kindwise vision services prevents outages during API quota limits.

### 4. 📰 Curated Agricultural News
* **Live News Aggregator**: Automatically aggregates and filters breaking stories on agriculture, agri-tech, MSP policies, and monsoon updates.
* **Categorized Reading**: Filter by Policy, Weather, Market Trends, Technology, and Farming Techniques with read-time indicators.

### 5. 🏛️ Central & State Government Schemes Directory
* **Comprehensive Welfare Portal**: Detailed guides on PM-Kisan, PMFBY (Crop Insurance), Agriculture Infrastructure Fund (AIF), Soil Health Cards, e-NAM, and PMKSY.
* **Application Readiness**: Document checklists, subsidy percentages, eligibility criteria, and direct government application links.

---

## ⚡ Performance & Scalability Highlights

| Metric | Direct External API | Mandi Mitra (Cached) | Improvement |
| :--- | :---: | :---: | :---: |
| **Mandi Price Queries** | 1,200 ms – 2,500 ms | **< 3 ms** | **99.7% Latency Reduction** |
| **Weather Forecasts** | 600 ms – 1,200 ms | **< 2 ms** | **99.8% Latency Reduction** |
| **Agricultural News** | 450 ms – 900 ms | **< 2 ms** | **99.6% Latency Reduction** |
| **Crop AI Image Inference** | 3,500 ms – 5,000 ms | **< 1.8 s** | **In-Memory Stream Processing** |
| **Client Bundle Size** | — | **102 KB (gzipped)** | **Vite Production Optimization** |

---

## 📁 Repository Structure

```
Mandi_Mitra/
├── backend/
│   ├── routes/
│   │   ├── commodity.js       # Mandi price API handlers with 1-hr caching
│   │   ├── weather.js         # Weather API with coordinate-rounding cache
│   │   ├── news.js            # Agricultural news aggregation
│   │   └── cropDoctor.js      # Kindwise AI computer vision diagnosis
│   ├── .env                   # Environment secrets (API keys & ports)
│   ├── .env.example           # Template for environment variables
│   ├── index.js               # Express application entry point & health check
│   └── package.json           # Backend dependencies
│
├── frontend/
│   ├── pages/
│   │   ├── Home.jsx           # Modern hero section, features & statistics
│   │   ├── MandiPrice.jsx     # Interactive commodity search & filter UI
│   │   ├── WeatherForecast.jsx# 7-day weather cards & UV/wind metrics
│   │   ├── CropDoctor.jsx     # Drag-and-drop crop disease diagnostic tool
│   │   ├── News.jsx           # Categorized agri-news reader with pagination
│   │   └── GovSchemes.jsx     # Farmer welfare schemes directory
│   ├── src/
│   │   ├── components/
│   │   │   └── Navigation.jsx # Clean responsive navigation bar
│   │   ├── config.js          # API base URL configuration
│   │   ├── App.jsx            # React Router v7 routes
│   │   ├── main.jsx           # Root entry point
│   │   └── index.css          # Tailwind CSS 4 theme tokens
│   ├── vite.config.js         # Vite configuration with Render proxy
│   └── package.json           # Frontend dependencies
│
├── Mandi_Mitra_Resume_and_Interview_Prep.pdf # Interview & resume guide
└── README.md                  # Project documentation
```

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19 with Vite 6
- **Styling**: Tailwind CSS 4 with Glassmorphism UI
- **Routing**: React Router 7
- **Icons**: FontAwesome 6 Free

### Backend & AI
- **Runtime**: Node.js 22.x
- **Framework**: Express.js 5.x
- **In-Memory Caching**: `node-cache` (TTL-based micro-caching)
- **File Uploads**: `express-fileupload` (In-memory buffer streaming)
- **AI Computer Vision**: Kindwise API v1 & Plant.ID v3
- **Data Providers**: Open-Meteo, Data.gov.in, NewsAPI

### Cloud & Deployment
- **Frontend Hosting**: Vercel Edge Network
- **Backend Hosting**: Render Cloud Web Services

---

## 🚀 Quickstart & Local Development

### Prerequisites
- Node.js (v18 or higher)
- npm or yarn

### 1. Clone Repository
```bash
git clone https://github.com/Hemanth40/Mandi_Mitra.git
cd Mandi_Mitra
```

### 2. Backend Setup
```bash
# Navigate to backend
cd backend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env

# Start development server (runs on port 5000)
npm run dev
```

### 3. Frontend Setup
```bash
# Navigate to frontend in a new terminal
cd frontend

# Install dependencies
npm install

# Start Vite dev server (runs on port 8000)
npm run dev
```

Visit **`http://localhost:8000`** in your browser.

---

## ⚙️ Environment Variables Configuration

Create a `.env` file in the `backend/` directory:

```env
# External AI Vision APIs
CROP_HEALTH_URL=https://crop.kindwise.com/api/v1
CROP_HEALTH_API_KEY=your_crop_health_api_key

PLANT_ID_URL=https://plant.id/api/v3
PLANT_ID_API_KEY=your_plant_id_api_key

INSECT_ID_URL=https://insect.kindwise.com/api/v1
INSECT_ID_API_KEY=your_insect_id_api_key

MUSHROOM_ID_URL=https://mushroom.kindwise.com/api/v1
MUSHROOM_ID_API_KEY=your_mushroom_id_api_key

# Agricultural News API
NEWS_API_KEY=your_news_api_key

# Government Commodity Mandi API
COMMODITY_API_URL=https://api.data.gov.in/resource/9ef84268-d588-465a-a308-a864a43d0070
COMMODITY_API_KEY=your_data_gov_in_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
```

---

## 📡 API Reference

### Health & Monitoring
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/health` | Server uptime check (Returns `{ status: "ok" }`) |
| `GET` | `/api/crop-doctor/health` | Diagnostic check of configured AI vision endpoints |

### Commodity Market Prices
| Method | Endpoint | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/commodity/prices` | `?state=StateName` | Retrieves live mandi prices for a given state (Cached 1h) |
| `GET` | `/api/commodity/available-states` | — | Lists all available states with active market data |
| `GET` | `/api/commodity/check-api-key` | — | Validates data.gov.in API connectivity |

### Weather Forecast
| Method | Endpoint | Parameters | Description |
| :--- | :--- | :--- | :--- |
| `GET` | `/api/weather/current` | `?lat=28.61&lon=77.20` | Current weather, hourly forecasts, UV index, and 7-day outlook |

### AI Crop Diagnostics
| Method | Endpoint | Payload | Description |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/crop-doctor/analyze` | `multipart/form-data` (`image`, `type`) | Deep-learning diagnosis of plant diseases, insects, or mushrooms |
| `POST` | `/api/crop-doctor/identify` | `multipart/form-data` (`image`) | Plant species botanical identification |

### Agricultural News
| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `GET` | `/api/news` | Fetches filtered agricultural, farmer welfare, and farming technology news |

---

## 🌐 Deployment & Hosting

* **Frontend**: Continuous deployment via **Vercel** (`https://mandi-mitra-rose.vercel.app/`).
* **Backend**: Hosted as a Web Service on **Render** (`https://mandi-mitra.onrender.com`).
* **Cross-Origin Configuration**: Automated origin reflection and secure CORS headers enabled across environments.
