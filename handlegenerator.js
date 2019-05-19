let jwt = require( 'jsonwebtoken' );
let config = require( './config' );

var jsonfile = require('jsonfile');
// Clase encargada de la creación del token
class HandlerGenerator {

  sign_up(req,res){res.header("Access-Control-Allow-Origin", "*");

    let username = req.body.username;
    let password = req.body.password;

    jsonfile.readFile('./persistence/users.json',(err,users)=>{
      let usernames = users.map(user =>user.username);
      if(usernames.includes(username)){
        res.statusCode = 409;
        res.json({
          success:false,
          message:'Username already exists'
        });
      }
      else{
        users.push({username,password});
        jsonfile.writeFile('./persistence/users.json',users,(e)=>{
          if(e) throw e;
          // Se genera un nuevo token para el nombre de usuario el cuál expira en 24 horas
          let token = jwt.sign( { username: username },config.secret, { expiresIn: '24h' } );
          res.json({
            success: true,
            message: 'Signed up!',
            token: token
          });
        })
      }
    });
  }

  login( req, res ) {
    res.header("Access-Control-Allow-Origin", "*");
    
    // Extrae el usuario y la contraseña especificados en el cuerpo de la solicitud
    let username = req.body.username;
    let password = req.body.password;

    jsonfile.readFile('./persistence/users.json',(err,users)=>{
      var exists = false;
      for(var u of users){
        if(u.username = username && u.password==password){
          exists=true;
          break;
        }
      }
      if(!exists){
        res.statusCode = 409;
        res.json({
          success:false,
          message:'Username doesn´t exist'
        });
      }
      else{
        let token = jwt.sign( { username: username },config.secret, { expiresIn: '24h' } );
        res.json( {
          success: true,
          message: 'Authentication successful!',
          token: token
        } );
      }
    });
  }

  index( req, res ) {
    res.header("Access-Control-Allow-Origin", "*");
    res.json({
      success: true,
      message: 'Index page'
    });
  }
}

module.exports = HandlerGenerator;