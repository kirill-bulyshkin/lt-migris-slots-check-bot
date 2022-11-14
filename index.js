const CONFIGS = require("./configs/configs");
const { RESERVE_VISIT_LINK } = require("./requests/requests");
const { getListOfFreeDates, getListOfFreeTimes } = require("./core/migrisApiManager");
const { getNearestFreeDateInUTC, dateDifferenceFromCurrentDateInDays, getNearestFreeDateStringForApiRequest } = require("./utils/dateUtils");
const { mailTransporter } = require("./core/mailManager");
const cronJob = require('cron').CronJob;

const job = new cronJob(

    CONFIGS.SCHEDULE_OF_CHECK,

	async function checkForFreeDates() {
        const dates = await getListOfFreeDates();
        const nearestFreeDateInUTC = getNearestFreeDateInUTC(dates);
        const daysTillVisit = dateDifferenceFromCurrentDateInDays(nearestFreeDateInUTC);
        const visitInDaysMessage = `The nearest Free Date to visit in ${daysTillVisit} days`;

        if (CONFIGS.DAYS_TO_CHECK >= daysTillVisit) {
            const nearestFreeDateForApiRequest = getNearestFreeDateStringForApiRequest(dates);
            const listOfFreeTimes = await getListOfFreeTimes(nearestFreeDateForApiRequest);

            const emailSubject = "Notification - Free slots to visit LT MIGRIS";
            const emailText = `${visitInDaysMessage}.
                \n${nearestFreeDateForApiRequest} at ${CONFIGS.ADDRESS}.
                \nAvailable times: \n${listOfFreeTimes};
                \nThe link to register visit: \n${RESERVE_VISIT_LINK}`;
            console.log(emailText);

            await mailTransporter.sendMail(
                {
                    from: `${CONFIGS.EMAIL_OF_SENDER}`,
                    to: `${CONFIGS.EMAIL_OF_RECEIVER}`,
                    subject: emailSubject,
                    text: emailText
                }
            )

        } else {
            console.log(`Sorry, there are no available dates for registration in ${CONFIGS.DAYS_TO_CHECK} days. ${visitInDaysMessage}.`);
        }
    }
);

job.start();
