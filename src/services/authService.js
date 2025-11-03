import axios from "axios";

const API_URL = "http://localhost:3000"; // đổi thành domain nếu deploy

export const loginUser = async (email, password) => {
  return await axios.post(`${API_URL}/login`, { email, password });
};

export const registerUser = async (name, email, password) => {
  return await axios.post(`${API_URL}/register`, { name, email, password });
};
