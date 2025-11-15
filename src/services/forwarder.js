const axios = require('axios');

async function forwardToDestination(destination, data) {
  const opts = {
    method: destination.method || 'POST',
    url: destination.url,
    headers: destination.headers ? Object.fromEntries(destination.headers) : {},
    data
  };
  const resp = await axios(opts);
  return resp.status;
}

module.exports = { forwardToDestination };
