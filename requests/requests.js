const RESERVE_VISIT_LINK = "https://www.migracija.lt/app/visit-reserve";
const BASE_URL = "https://www.migracija.lt/external";

const REQUESTS = {
    VISIT_TYPES: `${BASE_URL}/classifiers/MIGRIS_KL45_VIZITU_TIPAI?lang=en`,
    INSTITUTIONS: (codeOfVisitType) => `${BASE_URL}/tickets/classif/${codeOfVisitType}/institutions`,
    DATES: (codeOfVisitType, codeOfInstitution, timestamp) => `${BASE_URL}/tickets/classif/${codeOfVisitType}/${codeOfInstitution}/dates?t=${timestamp}`,
    TIMES: (codeOfVisitType, codeOfInstitution, date, timestamp) => `${BASE_URL}/tickets/classif/${codeOfVisitType}/${codeOfInstitution}/${date}/times?t=${timestamp}` 
};

module.exports = { REQUESTS, RESERVE_VISIT_LINK };
