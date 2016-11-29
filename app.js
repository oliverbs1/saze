var httpPort = 1316;

var express = require('express'),
    ejs = require('ejs'),
    session = require('express-session'),
    bodyParser = require('body-parser');

//var app = express(__dirname+'/public');
var app = express();

app.set('view engine', 'ejs');
app.use('/', express.static(__dirname+'/public/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: false
}));

app
  .get('/', function(req, res, next){
    if(req.session.username === undefined) res.render('index.ejs');
    else res.redirect('/home');
  })
  .get('/home', function(req, res, next){
    res.render('home.ejs');
  })
  .get('/playlist', function(req, res, next){
    res.render('playlist.ejs');
  })
  .get('/search', function(req, res, next){
    res.render('search.ejs');
  })
  .use(function(req, res, next) {
    res.redirect('/');
  });

app.listen(httpPort);