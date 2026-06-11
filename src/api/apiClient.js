const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

/**
 * Cliente HTTP centralizado basado en Fetch API.
 * Añade automáticamente el header Authorization si existe token en localStorage.
 *
 * @param {string} endpoint - Ruta relativa (ej: '/api/tasks')
 * @param {RequestInit} options - Opciones de fetch
 */
const apiClient = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` }),
    ...options.headers,
  };

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json();

  if (!response.ok) {
    // Lanzar error con el mensaje del servidor para mostrarlo en la UI
    const message =
      data.message ||
      (data.errors && data.errors[0]?.msg) ||
      'Error desconocido';
    throw new Error(message);
  }

  return data;
};

export default apiClient;
