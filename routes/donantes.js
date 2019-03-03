var express = require('express');
var router = express.Router();
var jsonfile = require('jsonfile');

/* GET users listing. */
router.get('/', function(req, res, next) {
    jsonfile.readFile('./persistence/donantes.json', (err, obj) => {
        res.send(obj);
    });
});

router.post('/', function(req, res, next) {
    jsonfile.readFile('./persistence/donantes.json', (err, donantes) => {
        let ids = donantes.map(donante => donante.id);
        if (ids.includes(req.body.id)) {
            res.send('Ya existe un donante con ID: ' + req.body.id);
        } else {
            donantes.push(req.body);
            jsonfile.writeFile('./persistence/donantes.json', donantes, function(err) {
                if (err) throw err;
                res.send(donantes);
            });
        }
    });
});

router.get('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/donantes.json',(err,obj)=>{
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
            res.send('No existe un donante con ID: ' + id);
        }
    });
});


router.put('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/donantes.json',(err,obj)=>{
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
            jsonfile.writeFile('./persistence/donantes.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj[ind]);
        }
        else{
            res.statusCode=404;
            res.send('No existe un donante con ID: ' + id);
        }
    });
});

router.delete('/:id', function(req, res, next) {
    let id = parseInt(req.params.id);
    jsonfile.readFile('./persistence/donantes.json',(err,obj)=>{
        var ind=-1;
        let ids= obj.map((el,index)=>{
            if(el.id===id){
                ind=index;
            }
            return el.id;
        });
        if(ind>=0){
            obj.splice(ind,1);
            jsonfile.writeFile('./persistence/donantes.json', obj, function(err) {
                if (err) throw err;
            });
            res.send(obj);
        }
        else{
            res.statusCode=404;
            res.send('No existe un donante con ID: ' + id);
        }
    });
});


module.exports = router;