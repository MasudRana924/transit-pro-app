import axios from 'axios';

const API_BASE_URL = 'https://your-backend-api.com'; // Replace with your backend URL

// Login API
export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, {
      email,
      password,
    });
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Register API
export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/register`, {
      email,
      password,
    });
    return response.data; // { token, user }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

// Search Buses API
export const searchBuses = async (from, to, date) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/search-buses`, {
      params: { from, to, date },
    });
    return response.data; // { buses: [...] }
  } catch (error) {
    throw error.response?.data || error.message;
  }
};