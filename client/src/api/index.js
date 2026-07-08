const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Helper to handle API responses
const handleResponse = async (response) => {
  if (response.status === 401) {
    // If not on login page, redirect
    if (window.location.pathname !== '/admin/login') {
      window.location.href = '/admin/login';
    }
    throw new Error('Unauthorized');
  }
  
  const data = await response.json().catch(() => null);
  if (!response.ok) {
    throw new Error(data?.msg || data?.error || 'API Request Failed');
  }
  return data;
};

// Wrapper for fetch requests that need credentials (cookies)
const fetchWithAuth = async (endpoint, options = {}) => {
  const mergedOptions = {
    ...options,
    credentials: 'include' // This ensures the HTTP-Only cookie is sent
  };
  
  if (options.body && !(options.body instanceof FormData)) {
    mergedOptions.headers = {
      ...mergedOptions.headers,
      'Content-Type': 'application/json'
    };
  }

  const res = await fetch(`${API_BASE_URL}${endpoint}`, mergedOptions);
  return handleResponse(res);
};

// --- AUTH ---
export const loginAdmin = async (credentials) => {
  const res = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(credentials),
    credentials: 'include'
  });
  return handleResponse(res);
};

export const logoutAdmin = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  });
  return handleResponse(res);
};

export const checkAuth = async () => {
  const res = await fetch(`${API_BASE_URL}/auth/check`, {
    method: 'GET',
    credentials: 'include'
  });
  return handleResponse(res);
};

// --- PROJECTS ---
export const fetchProjects = async () => {
  const res = await fetch(`${API_BASE_URL}/projects`);
  return handleResponse(res);
};

export const fetchProjectById = async (id) => {
  const res = await fetch(`${API_BASE_URL}/projects/${id}`);
  return handleResponse(res);
};

export const createProject = async (projectData) => {
  return fetchWithAuth('/projects', {
    method: 'POST',
    body: JSON.stringify(projectData)
  });
};

export const updateProject = async (id, projectData) => {
  return fetchWithAuth(`/projects/${id}`, {
    method: 'PUT',
    body: JSON.stringify(projectData)
  });
};

export const deleteProject = async (id) => {
  return fetchWithAuth(`/projects/${id}`, {
    method: 'DELETE'
  });
};

export const uploadMedia = async (formData) => {
  return fetchWithAuth('/projects/upload-media', {
    method: 'POST',
    body: formData
  });
};

export const uploadGallery = async (formData) => {
  return fetchWithAuth('/projects/upload-gallery', {
    method: 'POST',
    body: formData
  });
};

// --- EXPERIENCE ---
export const fetchExperience = async () => {
  const res = await fetch(`${API_BASE_URL}/experience`);
  return handleResponse(res);
};

export const createExperience = async (expData) => {
  return fetchWithAuth('/experience', {
    method: 'POST',
    body: JSON.stringify(expData)
  });
};

export const updateExperience = async (id, expData) => {
  return fetchWithAuth(`/experience/${id}`, {
    method: 'PUT',
    body: JSON.stringify(expData)
  });
};

export const deleteExperience = async (id) => {
  return fetchWithAuth(`/experience/${id}`, {
    method: 'DELETE'
  });
};

// --- PROFILE ---
export const fetchProfile = async () => {
  const res = await fetch(`${API_BASE_URL}/profile`);
  return handleResponse(res);
};

export const updateProfile = async (profileData) => {
  return fetchWithAuth('/profile', {
    method: 'POST',
    body: JSON.stringify(profileData)
  });
};

export const uploadResume = async (formData) => {
  return fetchWithAuth('/profile/upload-resume', {
    method: 'POST',
    body: formData
  });
};

// --- CONTACT / MESSAGES ---
export const submitContactForm = async (formData) => {
  const res = await fetch(`${API_BASE_URL}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(formData)
  });
  return handleResponse(res);
};

export const fetchMessages = async () => {
  return fetchWithAuth('/contact/messages');
};

export const markMessageRead = async (id) => {
  return fetchWithAuth(`/contact/messages/${id}/read`, {
    method: 'PUT'
  });
};

export const deleteMessage = async (id) => {
  return fetchWithAuth(`/contact/messages/${id}`, {
    method: 'DELETE'
  });
};

// --- ANALYTICS ---
export const trackVisit = async () => {
  const res = await fetch(`${API_BASE_URL}/analytics/track`, {
    method: 'POST'
  });
  return handleResponse(res);
};

export const fetchAnalytics = async () => {
  return fetchWithAuth('/analytics');
};
