const BASE_URL = "https://www.migracija.lt/external";
const RESERVE_VISIT_LINK = "https://www.migracija.lt/app/visit-reserve";

const REQUESTS = {
    VISIT_TYPES: `/classifiers/MIGRIS_KL45_VIZITU_TIPAI?lang=en`,
    INSTITUTIONS: (codeOfVisitType) => `/tickets/classif/${codeOfVisitType}/institutions`,
    DATES: (codeOfVisitType, codeOfInstitution, timestamp) => `/tickets/classif/${codeOfVisitType}/${codeOfInstitution}/dates?t=${timestamp}`,
    TIMES: (codeOfVisitType, codeOfInstitution, date, timestamp) => `/tickets/classif/${codeOfVisitType}/${codeOfInstitution}/${date}/times?t=${timestamp}` 
};

module.exports = { BASE_URL, RESERVE_VISIT_LINK, REQUESTS };
