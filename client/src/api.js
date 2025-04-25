
//api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to production URL later
});

export const login = (data) => API.post('/auth/login', data);
export const getProjects = () => API.get('/projects');
export const createProject = (data, token) =>
  API.post('/admin/projects', data, {
    headers: { Authorization: `Bearer ${token}` },
  });
export const updateProject = (id, updatedData, token) =>
  axios.put(`https://localhost:5000/api/projects/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteProject = (id, token) =>
  axios.delete(`https://localhost:5000/api/projects/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
