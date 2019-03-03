var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');


/* GET users listing. */
router.get('/', function(req, res, next) {
    jsonfile.readFile('./persistence/Ong.json',(err,obj)=>{
        res.send(obj);
    });
});

router.post('/', function(req, res, next) {
    jsonfile.readFile('./persistence/Ong.json',(err,obj)=>{
        let ids= obj.map(el=>el.id);
        if(ids.includes(req.body.id)){
            res.send('el id ya existe');
        }
        else{
            obj.push(req.body);
            jsonfile.writeFile('./persistence/Ong.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
    });
});

router.put('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/Ong.json',(err,obj)=>{
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
            jsonfile.writeFile('./persistence/Ong.json', obj, function(err) {
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

router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/Ong.json',(err,obj)=>{
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

router.delete('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/Ong.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ids.includes(id)){
            obj.splice(ind,1);
            jsonfile.writeFile('./persistence/Ong.json', obj, function(err) {
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