const axios = require('axios');

async function sendGetRequest(url) {
    try {
        const response = (await axios.get(url)).data;
        return response;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { sendGetRequest }
