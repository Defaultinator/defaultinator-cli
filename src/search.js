const axios = require('axios');
const { api } = require('./api');

const search = async (options) => {
  const { vendor, product, number } = options;
  const query = {
    ...(vendor && { vendor: vendor }),
    ...(product && { product: product }),
  };

  if (Object.keys(query).length == 0) throw new Error(`At least one search parameter is required.`)

  return await api.get(`credentials/search`,
    {
      params: {
        ...query, unique: true, ...(number && { limit: number }),
      }
    })
    .then(({ status, data }) => {
      if (status != 200) throw new Error(data.message || `Unknown error during search.`);
      data.docs.map(({ _id: record }) => console.log(JSON.stringify(record)))
      return (data);
    })
    .catch((e) => console.error(e.message));
};

module.exports = {
  search,
};