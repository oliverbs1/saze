var mysql = require('mysql');

module.exports = function(callback){
  var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'test',
    database : 'saze'
  });
  db.connect(function(err){
    if(err) throw err;
  });
  callback(db);
  db.end();
}