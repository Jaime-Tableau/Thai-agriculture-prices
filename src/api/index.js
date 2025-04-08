import axios from "axios";

// Use local backend for development
const api = axios.create({
  baseURL: "http://localhost:8000", // Switch to Render URL after deployment
});

// API functions
export const fetchProductTypes = () => api.get("/dropdowns/product-types");
export const fetchProductGroups = (type) =>
  api.get("/dropdowns/product-groups", { params: { type } });
export const fetchProductNames = (group) =>
  api.get("/dropdowns/product-names", { params: { group } });
export const fetchPrices = (params) =>
  api.get("/prices", { params });

export default api;
