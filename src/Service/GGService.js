import axios from "axios";

// Set up the base URL and default settings
const API_URL = "https://localhost:8080/public"; // Update with your backend URL

const api = axios.create({
  baseURL: API_URL
});
export default api;