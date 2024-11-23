// services/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.API_BASE_URL, // API manzili .env faylidan olinadi
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.JWT_TOKEN}`, // Agar autentifikatsiya kerak bo'lsa
  },
});

// GET so'rovi
export const fetchData = async (endpoint: string) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// POST so'rovi
export const postData = async (endpoint: string, data: object) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};

// PATCH so'rovi (yangilash)
export const updateData = async (endpoint: string, data: object) => {
  try {
    const response = await api.patch(endpoint, data);
    return response.data;
  } catch (error) {
    console.error('API error:', error);
    throw error;
  }
};
