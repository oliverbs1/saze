var mysql = require('mysql');

module.exports = function(queryCallback, endCallback = undefined){
  var db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'test',
    database : 'saze'
  });
  db.connect(function(err){
    if(err) throw err;
  });
  queryCallback(db);
  db.end(function(){
    if(endCallback !== undefined) endCallback(db);
  });
}