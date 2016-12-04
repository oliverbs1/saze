var mysql = require('../db');

exports.add = function(f, l, a, e, u, p){
  var sql = "INSERT INTO user (firstname, lastname, age, email, username, password) \ "
            +"VALUES('"+f+"', '"+l+"', '"+a+"', '"+e+"', '"+u+"', '"+p+"')";
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