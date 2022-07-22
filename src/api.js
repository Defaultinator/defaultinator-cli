const axios = require('axios');
const conf = new (require('conf'))()
const { API_URI} = require('./config/constants')

const API_KEY = conf.get(`API_KEY`);
if (!API_KEY) new Error(`No API key provided. Please log in with the 'login' command.`)

const api = axios.create({
  baseURL: conf.get('URI') || API_URI,
  headers: {
    'X-API-KEY': API_KEY,
    'User-Agent': 'defaultinator-cli/0.0.1 (https://github.com/Defaultinator/defaultinator-cli)'
  }
});

module.exports = {
  api,
};