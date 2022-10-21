const { locators } = require("../locators/locators");
const nodemailer = require("../node_modules/nodemailer")

async function datesAreBooked() {
    if (await $$(locators.freeDates).length === 0 && await $$(locators.nonFreeDates).length > 28) {
        return true;
    } else {
        return false;
    }
}

async function setTimeout() {
    return browser.executeAsync(function(done){
        setTimeout(done, 2000);
    });
}

async function notifyViaEmail(receiveTo, emailSubject, emailText) {
    const mailTransporter =
    nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
        user: 'apikey',
        pass: `${process.env.API_KEY}`
        }
    });
    await mailTransporter.sendMail(
        {
            from: `${process.env.EMAIL_OF_SENDER}`,
            to: receiveTo,
            subject: emailSubject,
            text: emailText
        }
    )
}

module.exports = { datesAreBooked, setTimeout, notifyViaEmail }
