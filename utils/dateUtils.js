const _ = require("lodash");

function getTimestamp() {
    return Date.now();
}

function getNearestFreeDateStringFromArray(datesArray) {
    return _.min(datesArray);
}

function removeTimeFromDate(date) {
    return date.split('T')[0];
}

function getNearestFreeDateStringForApiRequest(datesArray) {
    const nearestFreeDateString = getNearestFreeDateStringFromArray(datesArray);
    const properDateString = removeTimeFromDate(nearestFreeDateString);
    
    return properDateString;
}

function getNearestFreeDateInUTC(datesArray) {
    const nearestFreeDateString = getNearestFreeDateStringFromArray(datesArray);
    const nearestFreeDateStringWithoutTime = removeTimeFromDate(nearestFreeDateString);
    const nearestFreeDateArray = nearestFreeDateStringWithoutTime.split('-');

    return Date.UTC(nearestFreeDateArray[0], (Number(nearestFreeDateArray[1])) - 1, nearestFreeDateArray[2]);
}

function dateDifferenceFromCurrentDateInDays(date) {
    const MS_PER_DAY = 1000 * 60 * 60 * 24;
    const currentDate = new Date();
    const currentDateInUTC = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
  
    return Math.floor((date - currentDateInUTC) / MS_PER_DAY);
  }

module.exports = { getTimestamp, getNearestFreeDateStringForApiRequest, getNearestFreeDateInUTC, dateDifferenceFromCurrentDateInDays }
