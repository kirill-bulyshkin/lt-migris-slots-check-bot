module.exports = {
  //needed number of days to check
  DAYS_TO_CHECK: 60,
  //for example: "Documents issued to foreigners - collection"
  TYPE_OF_VISIT: "",
  //for example: "Vilnius, Vytenio st. 18"
  ADDRESS: "",
  EMAIL_OF_RECEIVER: "",
  //create and verify SendGrid Sender: "https://docs.sendgrid.com/ui/sending-email/sender-verification"
  EMAIL_OF_SENDER: "",
  //can be found in SendGrid account settings by link "https://app.sendgrid.com/settings/api_keys"
  API_KEY: "",
  //cron-expression to run every 20 minutes
  //simple examples can be found here https://crontab.guru/
  SCHEDULE_OF_CHECK: "* */20 * * * *"
}
