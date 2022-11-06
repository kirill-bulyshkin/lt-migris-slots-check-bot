const { sendGetRequest } = require("../utils/apiUtils");
const { REQUESTS } = require("../requests/requests");
const { CONFIGS } = require("../configs/configs");
const { getTimestamp } = require("../utils/dateUtils");
const nodemailer = require("../node_modules/nodemailer");


async function getCodeOfVisitByVisitType() {
    const response = await sendGetRequest(REQUESTS.VISIT_TYPES);
    const codeOfVisit = (response.find(visit => visit.titleEn === `${CONFIGS.TYPE_OF_VISIT}`)).key;
    return codeOfVisit;
}

async function getCodeOfInstitution() {
    const response = await sendGetRequest(REQUESTS.INSTITUTIONS(await getCodeOfVisitByVisitType()));
    const codeOfInstitution = (response.find(institution => institution.titleEn === `${CONFIGS.ADDRESS}`)).key;
    return codeOfInstitution;
}

async function getListOfFreeDates() {
    const listOfFreeDates = await sendGetRequest(REQUESTS.DATES(await getCodeOfVisitByVisitType(), await getCodeOfInstitution(), getTimestamp()));
    return listOfFreeDates;
}

async function getListOfFreeTimes(date) {
    const listOfFreeTimes = await sendGetRequest(REQUESTS.TIMES(
        await getCodeOfVisitByVisitType(),
        await getCodeOfInstitution(),
        date,
        getTimestamp(),
    ));
    const listOfFreeTimesWithoutDates = listOfFreeTimes.map(time => { return '\n' + time.split('T')[1] });
    return listOfFreeTimesWithoutDates;
}

async function notifyViaEmail(receiveTo, emailSubject, emailText) {
    const mailTransporter =
    nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        auth: {
        user: 'apikey',
        pass: `${CONFIGS.API_KEY}`
        }
    });
    await mailTransporter.sendMail(
        {
            from: `${CONFIGS.EMAIL_OF_SENDER}`,
            to: receiveTo,
            subject: emailSubject,
            text: emailText
        }
    )
}

module.exports = { getCodeOfVisitByVisitType, getCodeOfInstitution, getListOfFreeDates, getListOfFreeTimes, notifyViaEmail }
