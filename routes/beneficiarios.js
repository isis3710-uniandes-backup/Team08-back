var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

var middleware = require("../middleware.js");
/* GET users listing. */
router.get('/', middleware.checkToken,function(req, res, next) {
    jsonfile.readFile('./persistence/beneficiarios.json', (err, obj) => {
        res.send(obj);
    });
});

router.post('/', middleware.checkToken,function(req, res, next) {
    jsonfile.readFile('./persistence/beneficiarios.json', (err, beneficiarios) => {
        let ids = beneficiarios.map(beneficiario => beneficiario.id);
        if (ids.includes(req.body.id)) {
            res.statusCode=409;
            res.send('Ya existe un beneficiario con ID: ' + req.body.id);
        } else {
            beneficiarios.push(req.body);
            jsonfile.writeFile('./persistence/beneficiarios.json', beneficiarios, function(err) {
                if (err) throw err;
                res.send(beneficiarios);
            });
        }
    });
});

router.get('/:id', middleware.checkToken,function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/beneficiarios.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ids.includes(id)){
            res.send(obj[ind]);
        }
        else{
            res.statusCode=409;
            res.send('No existe un beneficiario con ID: ' + id);
        }
    });
});


router.put('/:id', middleware.checkToken,function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/beneficiarios.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ind>=0){
            obj.id=id;
            obj[ind]=req.body;
            jsonfile.writeFile('./persistence/beneficiarios.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj[ind]);
        }
        else{
            res.statusCode=409;
            res.send('No existe un beneficiario con ID: ' + id);
        }
    });
});

router.delete('/:id', middleware.checkToken,function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/beneficiarios.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ind>=0){
            obj.splice(ind,1);
            jsonfile.writeFile('./persistence/beneficiarios.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
        else{
            res.statusCode=409;
            res.send('No existe un beneficiario con ID: ' + id);
        }
    });
});


module.exports = router;