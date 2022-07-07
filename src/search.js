const conf = new (require('conf'))()
const axios = require('axios');

const { API_URI } = require('./config/constants');

const search = async (params) => {
  const { vendor, product, number } = params;
  const query = {
    ...(vendor && { vendor: vendor }),
    ...(product && { product: product }),
  };

  const API_KEY = conf.get(`API_KEY`);
  if (!API_KEY) new Error(`No API key provided. Please log in with the 'login' command.`)

  if (Object.keys(query).length == 0) throw new Error(`At least one search parameter is required.`)

  return await axios.get(`${API_URI}/credentials/search`,
    {
      params: {query, ...(number && { limit: number }),
    },
      headers: {
        "X-API-KEY": API_KEY
      },
    })
    .then(({ status, data }) => {
      if (status != 200) throw new Error(data.message || `Unknown error during search.`);
      data.docs.map(({ username, password }) => console.log(`${username}:${password}`))
      return (data);
    })
    .catch((e) => console.error(e.message));

};

module.exports = {
  search,
};