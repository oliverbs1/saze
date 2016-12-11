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
  mysql(function(db){
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

exports.getData = function(email, callback){
  var sql = "SELECT * FROM user WHERE email = '"+email+"'";
  mysql(function(db){
    db.query(sql, function(err, rows, fields){
      if(err) throw err;
      var data = {
        id: rows[0].id,
        firstname: rows[0].firstname,
        lastname: rows[0].lastname,
        email: rows[0].email,
        username: rows[0].username,
        password: rows[0].password,
        profile_picture: rows[0].profile_picture,
        create_date: rows[0].create_date
      }
      callback(data);
    })
  });
}
