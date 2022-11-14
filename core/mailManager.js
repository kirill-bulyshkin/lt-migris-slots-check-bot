const CONFIGS = require("../configs/configs");
const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: `${CONFIGS.API_KEY}`
    }
});

module.exports = { mailTransporter }
