var mysql = require('../db');

exports.add = function(f, l, a, e, u, p){
  var sql = "INSERT INTO user (firstname, lastname, age, email, username, password) \ "
            +"VALUES('"+f+"', '"+l+"', '"+a+"', '"+e+"', '"+u+"', '"+p+"')";
  mysql(function(db){
    db.query(sql);
  });
}

exports.isset = function(dataType, value, callback){
  if(dataType === 'username') var sql = "SELECT username FROM user WHERE username = '"+value+"'";
  else if(dataType === 'email') var sql = "SELECT email FROM user WHERE email = '"+value+"'";
  else return 'Undefined data type (first parameter)';
  mysql(function(db){
    db.query(sql, function(err, rows, fields){
      if(err) throw err;
      callback(rows.length);
    });
  });
}