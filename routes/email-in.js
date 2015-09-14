var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/email/in', function(req, res, next) {
  console.log(req.body.plain);
  console.log(req.body.html);
  res.send(req.body);
});

module.exports = router;