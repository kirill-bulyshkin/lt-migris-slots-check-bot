const axios = require('axios');
const { BASE_URL } = require('../requests/requests');

async function sendGetRequest(url) {
    try {
        const response = (await axios.get(`${BASE_URL}${url}`)).data;
        return response;
    } catch (err) {
        console.error(err);
    }
};

module.exports = { sendGetRequest }
