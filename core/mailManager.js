const nodemailer = require("nodemailer");

const mailTransporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net',
    port: 587,
    auth: {
        user: 'apikey',
        pass: `${process.env.API_KEY}`
    }
});

module.exports = { mailTransporter }
