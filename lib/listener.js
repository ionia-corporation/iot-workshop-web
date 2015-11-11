var mqtt = require('mqtt');
var email = require('./email');
var sms = require('./sms');


var mqttURL = [
    'mqtt://',
    process.env.XIVELY_ACCOUNT_BROKER_USER,
    ':',
    process.env.XIVELY_ACCOUNT_BROKER_PASSWORD,
    '@',
    process.env.XIVELY_BROKER_HOST,
    ':1883'
  ].join('');

var client = mqtt.connect(mqttURL);
var reconnect;

client.on('connect', function() {
  clearInterval(reconnect);
  console.log('Connected to ' + mqttURL);
  client.subscribe(process.env.XIVELY_SAMPLE_DEVICE_CHANNEL);
  console.log('Subscribed to \'' + process.env.XIVELY_SAMPLE_DEVICE_CHANNEL + '\'');
  console.log(
    'Send messages: mosquitto_pub -m "Sample message" -h "%s" -p 1883 -P "%s" -u "%s" -t "%s"',
    process.env.XIVELY_BROKER_HOST,
    process.env.XIVELY_ACCOUNT_BROKER_PASSWORD,
    process.env.XIVELY_ACCOUNT_BROKER_USER,
    process.env.XIVELY_SAMPLE_DEVICE_CHANNEL
  );

});
client.on('message', function(topic, message) {
  var messageString = message.toString();

  // Log message
  console.log('Message recieved on \'%s\'\nMessage: %s', topic, messageString);
  
  // Send email
  email.send(
    process.env.EMAIL_TO,
    process.env.EMAIL_FROM,
    process.env.EMAIL_SUBJECT,
    messageString
  );
  
  // Send test message
  sms.send(
    process.env.SMS_TO,
    process.env.SMS_FROM,
    messageString
  );

});
client.on('close', function() {
  console.log('CONNECTION CLOSED');
  tryConnect();
});

client.on('offline', function() {
  console.log('CONNECTION OFFLINE');
  tryConnect();
});

client.on('error', function(error) {
  console.log('ERROR: ' + error);
  tryConnect();
});

var tryConnect = function() {
  console.log('Killing connection to retry');
  client.end();
  clearInterval(reconnect);
  console.log('Starting connect to ' + mqttURL);
  reconnect = setInterval(function() {
    client = mqtt.connect(mqttURL);
  }, 5000);
}