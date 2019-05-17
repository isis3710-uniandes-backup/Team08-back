var express = require('express');
var router = express.Router();
var HandlerGenerator = require("../handlegenerator.js");
var middleware = require("../middleware.js");
var jsonfile = require('jsonfile');

HandlerGenerator = new HandlerGenerator();
/* GET home page. */
router.get('/', middleware.checkToken,HandlerGenerator.index);
router.post('/login',HandlerGenerator.login);

router.get('/donantes',middleware.checkToken,function(req,res){
	jsonfile.readFile('./persistence/donantes.json', (err, donantes) => {
        res.json(donantes);
    });
});

module.exports = router;
