var mysql = require('./db');

exports.add = function(f, l, e, u, p){
  var sql = "INSERT INTO user (firstname, lastname, email, username, password) \ "
            +"VALUES('"+f+"', '"+l+"', '"+e+"', '"+u+"', '"+p+"')";
  mysql(function(db){
    db.query(sql);
  });
}

exports.isset = function(dataType, value, globalCallback, endCallback = undefined){
  if(dataType === 'username') var sql = "SELECT username FROM user WHERE username = '"+value+"'";
  else if(dataType === 'email') var sql = "SELECT email FROM user WHERE email = '"+value+"'";
  else return 'Undefined data type (first parameter)';
  mysql(
  function(db){
    db.query(sql, function(err, rows, fields){
      if(err) throw err;
      var response;
      if(rows.length == 0) response = false;
      if(rows.length >= 1) response = true;
      globalCallback(response);
    });
  }, 
  function(db){
    if(endCallback !== undefined) endCallback();
  });
}

<<<<<<< HEAD
exports.check = function(email, password) {
  var saltRounds = 12;
  bcrypt.hash(password, saltRounds, function(err, hash){
    var getPassword = "SELECT password FROM user WHERE email = '"+email+"'";
    var getEmail = "SELECT email FROM user WHERE password = '"+hash+"'";
    mysql(function(db){
      db.query(getPassword, function(err, rows, fields){
        if(err) {
          throw err;
          // JUST REDIRECT TO LOGIN PAGE
        }
        console.log(rows);
      })
    });
=======
//exports.check = function(email, password){
//  var getPassword = "SELECT password FROM user WHERE email = '"+email+"'";
//  var getEmail = "SELECT email FROM user WHERE password = '"+hash+"'";
//  mysql(function(db){
//    db.query(getPassword, function(err, rows, fields){
//      if(err) {
//        throw err;
//        // JUST NEED TO REDIRECT TO LOGIN PAGE
//      }
//      console.log(rows);
//    })
//  });
//}

exports.getPassword = function(email, callback){
  var sql = "SELECT password FROM user WHERE email = '"+email+"'";
  mysql(function(db){
    db.query(sql, function(err, rows, fields){
      callback(err, rows[0].password)
    })
>>>>>>> master
  });
}