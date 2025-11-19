import axios from "axios";

const api = axios.create({
    baseURL: "https://localhost:3000/api", // backend root
  withCredentials: true, // sends HttpOnly cookies automatically
});

export default api;

// src/services/api.js
const API_BASE = "http://localhost:3000"; // backend URL

export async function createIssue(issueData) {
  const res = await fetch(`${API_BASE}/issues`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(issueData),
  });
  return res.json();
}

export async function getIssues(owner, repo) {
  const res = await fetch(`${API_BASE}/issues/repo/${owner}/${repo}`);
  return res.json();
}
