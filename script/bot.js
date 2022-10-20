const { CONFIGS } = require("../configs/configs");
const { locators } = require("../locators/locators");

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

        for (let i = 0; i < CONFIGS.NUMBER_OF_RETRIES; i++) {
            $(locators.rightArrowButton).click();
            await setTimeout();
            if(await datesAreBooked()) {
                console.log('Sorry, there are no available dates for registration');
            } else {
                console.log('Hell Yeah!');
                const availableDayOfVisit = await (await $(`${locators.firstFreeDateButton}`)).getText();
                const availableYearAndMonthOfVisit = await (await $(`${locators.yyyyMonthLabel}`)).getText();
                const availableDateOfVisit = `Free date is ${availableYearAndMonthOfVisit} ${availableDayOfVisit} at ${CONFIGS.ADDRESS}. \nThe link to register visit: ${browser.options.baseUrl}`;
                console.log(availableDateOfVisit);
                break;
            }
        }
    });
});
