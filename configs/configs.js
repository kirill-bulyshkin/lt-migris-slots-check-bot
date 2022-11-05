const CONFIGS = {
//for example: "30"
  DAYS_TO_CHECK: "Put needed number of days to check",
//for example: "Documents issued to foreigners - collection"
  TYPE_OF_VISIT: "Put type of nedeed visit",
//for example: "Vilnius, Vytenio st. 18"
  ADDRESS: "Put address of needed institution",
  EMAIL_OF_RECEIVER: "Put your email here",
//create and verify SendGrid Sender: "https://docs.sendgrid.com/ui/sending-email/sender-verification"
  EMAIL_OF_SENDER: "Put your SendGrid Sender here",
//can be found in SendGrid account settings by link "https://app.sendgrid.com/settings/api_keys"
  API_KEY: "Put API key of your SendGrid Sender here",
//cron-expression to run every 20 minutes
//simple examples can be found here https://crontab.guru/
  SCHEDULE_OF_CHECK: '*/20 * * * *'
};

module.exports = { CONFIGS };
