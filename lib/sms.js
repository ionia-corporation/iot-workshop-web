var sms = {};
if (process.env.TWILIO_ACCT !== undefined && process.env.TWILIO_ACCT.length) {
  var client = require('twilio')(process.env.TWILIO_ACCT, process.env.TWILIO_AUTH_TOKEN);
  sms.send = function(to, from, body, callback) {
    //Send an SMS text message
    client.sendMessage({
      to: to,
      from: from,
      body: body
    }, function(err, responseData) {
      if (!err) {
        console.log('TWILIO: SMS sent to ' + to + ''); // outputs "word to your mother."
        if (callback !== undefined) {
          callback(err, responseData);
        }
      } else {
        console.error('TWILIO: ERROR sending SMS: ' + err);
      }
    });
  };
}
module.exports = sms;