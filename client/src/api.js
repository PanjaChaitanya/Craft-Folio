//api.js
import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000/api', // change to production URL later
});

export const login = (data) => API.post('/auth/login', data);
//projects api functions
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

//skills api functions
export const createSkill = (data, token) =>
  API.post('/skills', data, {
    headers: { Authorization: `Bearer ${token}` },
  }
);

export const getSkills = () => API.get('/skills');

export const updateSkill = (id, updatedData, token) =>
  API.put(`/skills/${id}`, updatedData, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const deleteSkill = (id, token) =>
  API.delete(`/skills/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const getStats = (token) =>
   API.get('/stats',{
    headers: {Authorization: `Bearer ${token}`}
   });

export const getProfiles = () => API.get('/profile');

export const createProfile = (formData, token) =>
  API.post('/profile', formData, {
     headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } 
    });
    
export const updateProfile = (id, formData, token) => 
  API.put(`/profile/${id}`, formData, { 
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'multipart/form-data' } 
  });
export const deleteProfile = (id, token) => API.delete(`/profile/${id}`, { headers: { 'Authorization': `Bearer ${token}` } });