import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:7256/api", // backend root
  withCredentials: true, // sends HttpOnly cookies automatically
});

export default api;

