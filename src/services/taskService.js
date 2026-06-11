import apiClient from '../api/apiClient';

export const getTasks = () => apiClient('/api/tasks');

export const createTask = (data) =>
  apiClient('/api/tasks', { method: 'POST', body: JSON.stringify(data) });

export const updateTask = (id, data) =>
  apiClient(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(data) });

export const completeTask = (id) =>
  apiClient(`/api/tasks/${id}/complete`, { method: 'PATCH' });

export const deleteTask = (id) =>
  apiClient(`/api/tasks/${id}`, { method: 'DELETE' });
