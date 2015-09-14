var mqtt = require('mqtt');
var email = require('./email');

var client = mqtt.connect(process.env.CLOUDMQTT_URL);
var reconnect;

client.on('connect', function() {
  clearInterval(reconnect);
  console.log('Connected to ' + process.env.CLOUDMQTT_URL);
  client.subscribe('button');
  console.log('Subscribed to \'button\'');
  // client.publish('button', 'email!');
});
client.on('message', function(topic, message) {
  console.log('Message recieved on \'' + topic + '\'\nMessage: ' +
    message.toString());
  // send email
  email.send(process.env.EMAIL_TO, process.env.EMAIL_FROM, process.env.EMAIL_SUBJECT,
    message.toString());
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
  console.log('Starting connect to ' + process.env.CLOUDMQTT_URL);
  reconnect = setInterval(function() {
    client = mqtt.connect(process.env.CLOUDMQTT_URL);
  }, 5000);
}