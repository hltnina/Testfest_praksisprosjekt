import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api", // endre til egen backend senere
});

export default api;
