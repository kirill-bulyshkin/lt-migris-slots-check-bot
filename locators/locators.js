const locators = {
  changeLanguageDropdown: "//select[contains(@class, 'migris-lang-select')]",
  selectLanguageButton: (lang) => `//option[@lang='${lang}']`,
  acceptButton: "//a[text()='Accept']",
  typeOfVisitDropdown: "//div[contains(@class,'mat-form-field-wrapper')]",
  selectTypeOfVisitButton: (type) => `//span[text()='${type}']`,
  addressOfVisitDropdown: "(//div[contains(@class,'mat-form-field-wrapper')])[2]",
  selectAddressOfVisitButton: (address) => `//span[contains(text(),'${address}')]`,
  calendar: "//mat-calendar",
  leftArrowButton: "//button[contains(@class,'mat-calendar-previous-button')]",
  rightArrowButton: "//button[contains(@class,'mat-calendar-next-button')]",
  freeDates: "//td[contains(@class,'mat-calendar-body-cell') and not(contains(@class,'mat-calendar-body-disabled'))]",
  nonFreeDates: "//td[contains(@class,'mat-calendar-body-disabled')]",
  yyyyMonthLabel: "#mat-calendar-button-0",
  firstFreeDateButton: "//td[contains(@class,'mat-calendar-body-cell') and not(contains(@class,'mat-calendar-body-disabled'))]//div[1]"
};

module.exports = { locators };
