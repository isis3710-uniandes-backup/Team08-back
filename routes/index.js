var express = require('express');
var router = express.Router();
var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");


HandlerGenerator = new HandlerGenerator();
router.post('/login',HandlerGenerator.login);
/* GET home page. */
router.get('/', function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.render('index', { title: 'Express' });
});

module.exports = router;
