// Node inbound port
var httpPort = 1316;

// NPM Package
var express = require('express'),
    app = express(),
    fs = require('fs'),
    ejs = require('ejs'),
    session = require('express-session'),
    bodyParser = require('body-parser'),
    bcrypt = require('bcrypt');

// Custom module
var userModel = require(__dirname+'/models/user'),
    toolCtrl = require(__dirname+'/controllers/tool');

// Set the HTML template engine to EJS
app.set('view engine', 'ejs');

// Grant access for this folders:
app.use('/', express.static(__dirname+'/public/'));
app.use('/', express.static(__dirname+'/public/fonts/font-awesome-4.7.0/'));
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
    if(req.session.token) res.redirect('/home');
    res.render('index.ejs');
  })
  .get('/home', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('home.ejs');
  })
  .get('/search', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('search.ejs');
  })
  .get('/upload', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('upload.ejs');
  })
  .get('/live', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('live.ejs');
  })
  .get('/my/tracks', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('mytracks.ejs');
  })
  .get('/my/playlists', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('myplaylists.ejs');
  })
  .get('/my/settings', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('mysettings.ejs');
  })
  .get('/my/account', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('myaccount.ejs');
  })
  .get('/logout', function(req, res, next){
    req.session.destroy();
    res.redirect('/');
  })
  .post('/signup', function(req, res, next){
    // Store the data of the signup form
    var data = req.body;
      // Hash the password
    var saltRounds = 12;
    bcrypt.hash(data.password, saltRounds, function(err, hash){
      if(err) throw err;
      if(data.confirm_password !== data.password) res.redirect('/');
      else data.password = hash;
      // Filter variables
      for(var prop in data) {
        if(data[prop] === '' || data[prop].indexOf(',') !== -1) res.redirect('/');
        if(prop !== 'password') {
          if(typeof data[prop] !== 'string' || data[prop].length >= 42) res.redirect('/');
        }
      }
      // Check the availability of email and username
      var usernameIsValid;
      var emailIsValid;
      userModel.isset('email', data.email,
        function(response){
          if(response) emailIsValid = false;
          else emailIsValid = true;
        },
        function(){
          userModel.isset('username', data.username,
            function(response){
              if(response) usernameIsValid = false;
              else usernameIsValid = true;
            },
            function(){
              // Add a user in the database
              if(usernameIsValid === true && emailIsValid === true) {
                userModel.add(data.firstname, data.lastname, data.email, data.username, data.password);
                toolCtrl.connect(req, req.body.email);
                res.redirect('/home');
              }
              else res.redirect('/');
            }
          );
        }
      );
    });
  })
  .post('/login', function(req, res, next){
    userModel.isset('email', req.body.email, function(response){
      if(response) {
        userModel.getData(req.body.email, function(userData){
          bcrypt.compare(req.body.password, userData.password, function(err, passwordIsValid){
            if(passwordIsValid) {
              toolCtrl.connect(req.body.email, req, res);
              // res.redirect('/home');
            }
            else res.redirect('/');
          });
        });
      }
      else res.redirect('/');
    });
  })
  .get('/404', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('404.ejs');
    res.end();
  })
  .get('/500', function(req, res, next){
    if(!req.session.token) res.redirect('/');
    res.render('500.ejs');
    res.end();
  })
  .use(function(req, res, next) {
    res.status(404);
    res.writeHead(302, {'Location': '/404'});
    res.end();
  })
  .use(function(req, res, next) {
    res.status(500);
    res.writeHead(302, {'Location': '/500'});
    res.end();
  });

// Launch node server
app.listen(httpPort);
