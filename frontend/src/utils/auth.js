// frontend/src/utils/auth.js

// Token management
export const getToken = () => {
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  localStorage.setItem('token', token);
};

export const removeToken = () => {
  localStorage.removeItem('token');
};

// User management
export const getUser = () => {
  const userStr = localStorage.getItem('user');
  return userStr ? JSON.parse(userStr) : null;
};

export const setUser = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUser = () => {
  localStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  const token = getToken();
  const user = getUser();
  return !!(token && user);
};

// Clear all auth data
export const clearAuth = () => {
  removeToken();
  removeUser();
};

// Save auth data after login/register
export const saveAuth = (token, user) => {
  setToken(token);
  setUser(user);
};

// Parse JWT token (basic parsing without verification)
export const parseToken = (token) => {
  try {
    const payload = token.split('.')[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
  } catch (error) {
    console.error('Error parsing token:', error);
    return null;
  }
};

// Check if token is expired
export const isTokenExpired = (token) => {
  try {
    const parsed = parseToken(token);
    if (!parsed || !parsed.exp) return true;
    
    const currentTime = Date.now() / 1000;
    return parsed.exp < currentTime;
  } catch (error) {
    return true;
  }
};

// Get user role from token
export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;
  
  const parsed = parseToken(token);
  return parsed?.role || 'user';
};

// Auth guard hook
export const useAuth = () => {
  const token = getToken();
  const user = getUser();
  
  return {
    isAuthenticated: !!(token && user && !isTokenExpired(token)),
    token,
    user,
    login: saveAuth,
    logout: clearAuth
  };
};