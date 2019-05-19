var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');
var middleware = require("../middleware.js");

/* GET users listing. */
router.get('/', middleware.checkToken, function(req, res, next) {
    console.log('erer')
    res.header("Access-Control-Allow-Origin", "*");
    jsonfile.readFile('./persistence/articulos.json', (err, obj) => {
        res.send(obj);
    });
});

router.post('/', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    jsonfile.readFile('./persistence/articulos.json', (err, articulos) => {
        let ids = articulos.map(articulo => articulo.id);
        if (ids.includes(req.body.id)) {
            res.statusCode=409;
            res.send('Ya existe un articulo con ID: ' + req.body.id);
        } else {
            articulos.push(req.body);
            jsonfile.writeFile('./persistence/articulos.json', articulos, function(err) {
                if (err) throw err;
                res.send(articulos);
            });
        }
    });
});

router.get('/:id', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/articulos.json',(err,obj)=>{
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
            res.send('No existe un articulo con ID: ' + id);
        }
    });
});


router.put('/:id', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/articulos.json',(err,obj)=>{
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
            jsonfile.writeFile('./persistence/articulos.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj[ind]);
        }
        else{
            res.statusCode=409;
            res.send('No existe un articulo con ID: ' + id);
        }
    });
});

router.delete('/:id', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/articulos.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ind>=0){
            obj.splice(ind,1);
            jsonfile.writeFile('./persistence/articulos.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
        else{
            res.statusCode=409;
            res.send('No existe un articulo con ID: ' + id);
        }
    });
});


module.exports = router;