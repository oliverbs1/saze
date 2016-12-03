// Node inbound port
var httpPort = 1316;

// NPM Package
var fs = require('fs'),
    express = require('express'),
    ejs = require('ejs'),
    session = require('express-session'),
    bodyParser = require('body-parser');

var app = express();

// Set the HTML template engine to EJS
app.set('view engine', 'ejs');

// Grant access for this folders:
app.use('/', express.static(__dirname+'/public/'));
app.use('/tracks/', express.static(__dirname+'/data/tracks'));

// Allow to recover the data of a post http request
app.use(bodyParser.urlencoded({extended: false}));

// Allow to use sessions system, that we'll be stores on the server
app.use(session({
  secret: 'test',
  resave: true,
  saveUninitialized: false
}));

// Routing
app
  .get('/', function(req, res, next){
    if(req.session.username === undefined) res.render('index.ejs');
    else res.redirect('/home');
  })
  .post('/signup', function(req, res, next){
    var userModel = require(__dirname+'/models/user');
    // Store the data of the signup form
    var data = req.body;
    data.age = Number(data.age);
    // Filter variables
    for(var prop in data) {
      if(data[prop] === '') res.redirect('/');
      if(prop !== 'age') {
        if(typeof data[prop] !== 'string' || data[prop].length >= 42) res.redirect('/');
      }
    }
    // Check the availability
    userModel.isset('email', data.email, function(response){
      if(response) res.redirect('/'); // INDIQUER SUR LA PAGE HOME QUE L'EMAIL EST DEJA PRIS
    });
    userModel.isset('username', data.username, function(response){
      if(response) res.redirect('/'); // INDIQUER SUR LA PAGE HOME QUE LE PASSWORD EST DEJA PRIS
    });
    // Add a user in the database
//    userModel/add(data.firstname, data.lastname, data.age, data.email, data.username, data.password);
//    res.redirect('/');
  })
  .post('/login', function(req, res, next){
    req.body.username;
    req.body.
    console.log(req.body);
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

// Launch node server
app.listen(httpPort);