import apiClient from '../api/apiClient';

export const registerService = (data) =>
  apiClient('/api/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });

export const loginService = (data) =>
  apiClient('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
