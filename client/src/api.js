//api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to production URL later
});

export const login = (data) => API.post('/auth/login', data);
export const getProjects = () => API.get('/projects');

export const createProject = (data, token) =>
  API.post('/projects', data, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const updateProject = (id, updatedData, token) =>
  API.put(`/projects/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProject = (id, token) =>
  API.delete(`/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

