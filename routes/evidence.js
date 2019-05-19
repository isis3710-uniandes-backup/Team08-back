var middleware = require("../middleware.js");
var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');


/* GET users listing. */
router.get('/', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    jsonfile.readFile('./persistence/evidences.json',(err,obj)=>{
        res.send(obj);
    });
});

router.post('/', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    jsonfile.readFile('./persistence/evidences.json',(err,obj)=>{
        let ids= obj.map(el=>el.id);
        if(ids.includes(req.body.id)){
            res.send('el id ya existe');
        }
        else{
            obj.push(req.body);
            jsonfile.writeFile('./persistence/evidences.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
    });
});

router.put('/:id', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.params.id;
    jsonfile.readFile('./persistence/evidences.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ids.includes(id)){
            obj.id=id;
            obj[ind]=req.body;
            jsonfile.writeFile('./persistence/evidences.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj[ind]);
        }
        else{
            res.statusCode=404;
            res.send('el id no existe');
        }
    });
});

router.get('/:id', middleware.checkToken,function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.params.id;
    jsonfile.readFile('./persistence/evidences.json',(err,obj)=>{
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
            res.send('el id no existe');
        }
    });
});

router.delete('/:id',middleware.checkToken, function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    let id = req.params.id;
    jsonfile.readFile('./persistence/evidences.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ids.includes(id)){
            obj.splice(ind,1);
            jsonfile.writeFile('./persistence/evidences.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
        else{
            res.statusCode=404;
            res.send('el id no existe');
        }
    });
});
module.exports = router;