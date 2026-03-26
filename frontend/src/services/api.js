import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const uploadDocument = async (file) => {
  const formData = new FormData();
  formData.append('files', file);
  
  const response = await api.post('/ingest', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const runQuery = async (query, pipeline) => {
  const response = await api.post('/query', {
    query,
    pipeline,
  });
  return response.data;
};

export default api;
