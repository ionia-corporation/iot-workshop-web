var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
    title: 'The Xively Button',
	MQTT_SERVER_ADDR: process.env.XIVELY_BROKER_HOST,
	MQTT_USERNAME_S: process.env.XIVELY_ACCOUNT_BROKER_USER,
	MQTT_KEY: process.env.XIVELY_ACCOUNT_BROKER_PASSWORD,
	MQTT_TOPIC: process.env.XIVELY_SAMPLE_DEVICE_CHANNEL,
  });
});

module.exports = router;