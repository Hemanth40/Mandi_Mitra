
// Configuration for API Base URL
// In development, we use the proxy (empty string -> relative path /api)
// In production, we use the Render Backend URL
const isDev = import.meta.env.DEV;

export const API_BASE_URL = isDev ? '' : 'https://mandi-mitra.onrender.com';
