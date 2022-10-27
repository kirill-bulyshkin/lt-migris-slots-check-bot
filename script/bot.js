const { CONFIGS } = require("../configs/configs");
const { locators } = require("../locators/locators");
const { setTimeout, datesAreBooked, notifyViaEmail } = require("../functions/functions");

describe('Checking MIGRIS free slots for registration', () => {
    it('Сheck that a free date for registration exists ', async () => {
        await browser.url('');
        await $(locators.changeLanguageDropdown).click();
        await $(locators.selectLanguageButton(CONFIGS.LANGUAGE)).click();
        await $(locators.acceptButton).click();
        await $(locators.typeOfVisitDropdown).click();
        await $(locators.selectTypeOfVisitButton(CONFIGS.TYPE_OF_VISIT)).click();
        await $(locators.addressOfVisitDropdown).waitForClickable();
        await $(locators.addressOfVisitDropdown).click();
        await $(locators.selectAddressOfVisitButton(CONFIGS.ADDRESS)).click();
        await $(locators.calendar).waitForDisplayed();

        await setTimeout();

        for (let i = 1; i <= CONFIGS.NUMBER_OF_MONTH_TO_CHECK; i++) {
            if(await datesAreBooked()) {
                console.log('Sorry, there are no available dates for registration');
            } else {
                console.log('Hell Yeah!');
                const emailSubject = "Notification - Availability of slots to visit in MIGRIS";
                const availableDayOfVisit = await (await $(`${locators.firstFreeDateButton}`)).getText();
                const availableYearAndMonthOfVisit = await (await $(`${locators.yyyyMonthLabel}`)).getText();
                const emailText = `Free date is ${availableYearAndMonthOfVisit} ${availableDayOfVisit} at ${CONFIGS.ADDRESS}. \nThe link to register visit: \n${browser.options.baseUrl}`;
                console.log(emailText);
                await notifyViaEmail(CONFIGS.EMAIL_OF_RECEIVER, emailSubject, emailText);
                break;
            }
            $(locators.rightArrowButton).click();
            await setTimeout();
        }
    });
});
