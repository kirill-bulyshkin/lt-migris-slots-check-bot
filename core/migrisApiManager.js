const { sendGetRequest } = require("../utils/apiUtils");
const { REQUESTS } = require("../requests/requests");
const CONFIGS = require("../configs/configs");
const { getTimestamp } = require("../utils/dateUtils");

async function getCodeOfVisitByVisitType() {
    const response = await sendGetRequest(REQUESTS.VISIT_TYPES);
    return response.find(visit => visit.titleEn === `${CONFIGS.TYPE_OF_VISIT}`).key;
}

async function getCodeOfInstitution() {
    const response = await sendGetRequest(REQUESTS.INSTITUTIONS(await getCodeOfVisitByVisitType()));
    return response.find(institution => institution.titleEn === `${CONFIGS.ADDRESS}`).key;
}

async function getListOfFreeDates() {
    return sendGetRequest(REQUESTS.DATES(await getCodeOfVisitByVisitType(), await getCodeOfInstitution(), getTimestamp()));
}

async function getListOfFreeTimes(date) {
    const listOfFreeTimes = await sendGetRequest(REQUESTS.TIMES(
        await getCodeOfVisitByVisitType(),
        await getCodeOfInstitution(),
        date,
        getTimestamp()
    ));
    return listOfFreeTimes.map(time => '\n' + time.split('T')[1] );
}

module.exports = { getCodeOfVisitByVisitType, getCodeOfInstitution, getListOfFreeDates, getListOfFreeTimes }
