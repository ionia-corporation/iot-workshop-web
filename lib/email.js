var sendgrid = require('sendgrid')(process.env.SENDGRID_USERNAME, process.env
  .SENDGRID_PASSWORD);

var email = {};

email.send = function(to, from, subject, text, callback) {
  console.log('SENDGRID: sending email\nto: "' + to + '"\nfrom: "' + from +
    '"\nsubject: "' + subject + '"\n\nmessage body:\n' + text);
  if (callback === undefined) {
    callback = function(err, json) {
      if (err) {
        return console.error('SENDGRID: ERROR sending email: ' + err);
      }
      console.log(json);
    }
  }
  sendgrid.send({
    to: to,
    from: from,
    subject: subject,
    text: text,
    replyto: process.env.CLOUDMAILIN_FORWARD_ADDRESS
  }, callback);
}

module.exports = email;