var httpPort = 1316;

var express = require('express'),
    ejs = require('ejs');
//    session = require('express-session'),
//    bodyParser = require('body-parser');
//
var app = express(__dirname+'/public');

app.use('/', express.static(__dirname+'/public/'));

//app.use(bodyParser.urlencoded({extended: false}));

//app.use(session({
//  secret: 'test',
//  resave: true,
//  saveUninitialized: false
//}));

app
  .get('/', function(req, res, next){
    res.redirect('/index');
})
  .get('/index', function(req, res, next){
    res.render('index.ejs');
})
  .get('/page2', function(req, res, next){
    res.render('page2.ejs');
})
  .use(function(req, res, next) {
    res.redirect('/index');
});

app.listen(httpPort);