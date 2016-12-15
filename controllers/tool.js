var crypto = require('crypto-js'),
    cryptoKey = 'kl8:21?P@o0',
    userModel = require(__dirname+'/../models/user');
    toolCtrl = require('./tool.js');

exports.connect = function(usrEmail, req, res){
  userModel.getData(usrEmail, function(usrData){
    var token = toolCtrl.generateToken(usrData.id+','
                                      +usrData.firstname+','
                                      +usrData.lastname+','
                                      +usrData.email+','
                                      +usrData.username+',');
    req.session.token = token;
    res.redirect('/home');
  });
}


exports.generateToken = function(message){
  var token = crypto.AES.encrypt(message, cryptoKey).toString();
  return token;
}

exports.decryptToken = function(token){
  clearToken = crypto.AES.decrypt(token, cryptoKey).toString(crypto.enc.Utf8);
  return clearToken;
}
