import axios from 'axios';

const API_URL = 'https://transitpro-service.onrender.com/api'; // Replace with your actual API URL

export const loginUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/login`, { email, password });
    return response.data; // Expecting `{ token: 'some_token' }`
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};

export const registerUser = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/auth/register`, { email, password });
    return response.data; // Expecting `{ success: true, message: 'Registered successfully' }`
  } catch (error) {
    throw error.response ? error.response.data : error.message;
  }
};
