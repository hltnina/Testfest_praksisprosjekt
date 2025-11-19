

require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;
const USER_AGENT = 'github-express-service';

// Helper to build axios headers (include token if available)
function makeHeaders() {
  const headers = {
    'User-Agent': USER_AGENT,
    'Accept': 'application/vnd.github.v3+json'
  };
  if (GITHUB_TOKEN) headers['Authorization'] = `token ${GITHUB_TOKEN}`;
  return headers;
}



// Health
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'github-express-service running' });
});

/**
 * Create a GitHub issue
 * POST /issues
 * body: { owner, repo, title, body }
 *
 * NOTE: This server requires a GITHUB_TOKEN env variable set on the server to create issues.
 * Anyone can call the endpoint, but the token must belong to a GitHub account that has permission
 * to create issues in the target repo.
 */
app.post('/issues', async (req, res) => {
  const { title, body: issueBody, assignees, labels } = req.body || {};
  const owner = "hltnina"; 
  const repo = "Testfest_praksisprosjekt"; 

  if (!title) {
    return res.status(400).json({ error: 'Missing required field: title' });
  }
  if (!GITHUB_TOKEN) {
    return res.status(500).json({ error: 'Server missing GITHUB_TOKEN' });
  }

  try {
    const url = `https://api.github.com/repos/htlnina/Testfest_praksisprosjekt/issues`;
    const payload = { title, body: issueBody || '', assignees, labels };
    const response = await axios.post(url, payload, { headers: makeHeaders() });
    return res.status(201).json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { message: err.message };
    return res.status(status).json({ error: 'GitHub API error', details: data });
  }
});


/**
 * Get issues for a given repository
 * GET /issues/repo/:owner/:repo
 * returns list of issues (first page up to 100)
 */
app.get('/issues/repo/:owner/:repo', async (req, res) => {
  const { owner, repo } = req.params;
  try {
    const url = `https://api.github.com/repos/hltnina/Testfest_prakisprosjekt/issues?per_page=100`;
    const response = await axios.get(url, { headers: makeHeaders() });
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { message: err.message };
    return res.status(status).json({ error: 'GitHub API error', details: data });
  }
});

/**
 * Get issues for a given user (issues authored by the user)
 * GET /issues/user/:username
 * Uses GitHub Search API to find issues authored by the user across public repos.
 */
app.get('/issues/user/:username', async (req, res) => {
  const { username } = req.params;
  try {
    // search issues authored by username
    const q = encodeURIComponent(`author:${username} type:issue`);
    const url = `https://api.github.com/search/issues?q=${q}&per_page=100`;
    const response = await axios.get(url, { headers: makeHeaders() });
    // search returns { total_count, items: [...] }
    return res.json(response.data);
  } catch (err) {
    const status = err.response?.status || 500;
    const data = err.response?.data || { message: err.message };
    return res.status(status).json({ error: 'GitHub API error', details: data });
  }
});

app.listen(PORT, () => {
  console.log(`github-express-service listening on port ${PORT}`);
});
