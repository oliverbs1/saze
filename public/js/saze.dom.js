var saze = saze || {};

// All the interactions with the html dom
saze.dom = {};

saze.dom.init = function(){
  saze.dom.enableSubmit();
}
saze.dom.enableSubmit = function(){
  $('body').on('click', '#login-form button', function(){
    $('#login-form').submit();
  });
  $('body').on('click', '#signup-form button', function(){
    $('#login-form').submit();
  });
}