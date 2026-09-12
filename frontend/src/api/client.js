import axios from 'axios';

// Dynamic API Base URL from environment variable or fallback to local backend
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://127.0.0.1:8000/api';

// Derive backend root URL for media assets (e.g. https://your-backend-domain.com or http://127.0.0.1:8000)
export const BACKEND_ROOT_URL = API_BASE_URL.replace(/\/api\/?$/, '');

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
  timeout: 10000,
});

/**
 * Resolves media paths from backend.
 * - Returns external URLs (e.g. Unsplash) as is.
 * - Strips accidental localhost/127.0.0.1 origins.
 * - Prepends BACKEND_ROOT_URL for relative paths (/media/...).
 */
export const getImageUrl = (imagePath, fallbackUrl = '') => {
  if (!imagePath) return fallbackUrl;
  if (typeof imagePath !== 'string') return fallbackUrl;

  // 1. Strip local development origins (http://127.0.0.1:8000 or http://localhost:8000)
  let clean = imagePath.replace(/^https?:\/\/(127\.0\.0\.1|localhost)(:\d+)?/i, '');

  // 2. If it is an external URL (e.g. Unsplash, CDN), return as is
  if (clean.startsWith('http://') || clean.startsWith('https://')) {
    return clean;
  }

  // 3. For relative paths (/media/... or media/...), prepend BACKEND_ROOT_URL
  const relativePath = clean.startsWith('/') ? clean : `/${clean}`;
  return `${BACKEND_ROOT_URL}${relativePath}`;
};

// High quality architectural & construction fallback images for zero-downtime aesthetics
export const PLACEHOLDER_IMAGES = {
  hero: 'https://images.unsplash.com/photo-1541888946425-d0fbb186156f?q=80&w=1920&auto=format&fit=crop',
  project: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1200&auto=format&fit=crop',
  interior: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop',
  satellite: 'https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=1200&auto=format&fit=crop',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
};

// API Services
export const getHome = async () => {
  const response = await apiClient.get('/home/');
  return response.data;
};

export const getCategories = async () => {
  const response = await apiClient.get('/categories/');
  return response.data;
};

export const getProjects = async (params = {}) => {
  const response = await apiClient.get('/projects/', { params });
  return response.data;
};

export const getProjectDetail = async (id) => {
  const response = await apiClient.get(`/projects/${id}/`);
  return response.data;
};

export const getContact = async () => {
  const response = await apiClient.get('/contact/');
  return response.data;
};

export const createLead = async (leadData) => {
  const response = await apiClient.post('/leads/create/', leadData);
  return response.data;
};

export default apiClient;