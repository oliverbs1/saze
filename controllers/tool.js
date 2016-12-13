var aes = require('crypto-js/aes'),
    userModel = require(__dirname+'/../models/user');

exports.connect = function(usrEmail, env){
  userModel.getData(usrEmail, function(usrData){
    env.req.session.userId = usrData.id;
    env.req.session.firstname = usrData.firstname;
    env.req.session.lastname = usrData.lastname;
    env.req.session.email = usrData.email;
    env.req.session.username = usrData.username;
    env.req.session.password = usrData.password;
    env.req.session.profile_picture = usrData.profile_picture;
    env.req.session.create_date = usrData.create_date;
    env.res.redirect('/home');
  });
};

exports.generateToken = function(message){
  // var encryption = aes.encrypt(message, 'kl8:21?P@o0');
  // var aes.decrypt('');
};
